"use server";

import { db } from "@/app/_lib/prisma";
import { createSaleSchema, CreateSaleSchema } from "./schema";
import { revalidateTag } from "next/cache";

export const createSale = async (data: CreateSaleSchema) => {
  createSaleSchema.parse(data);
  await db.$transaction(async (tx) => {
    const sale = await tx.sale.create({
      data: {
        date: new Date(),
      },
    });
    for (const product of data.products) {
      const productFromDb = await db.product.findUnique({
        where: {
          id: product.id,
        },
      });
      if (!productFromDb) {
        throw new Error(`Produto com id ${product.id} não encontrado`);
      }
      if (product.quantity > productFromDb.stock) {
        throw new Error(
          `Quantidade do produto ${productFromDb.name} excede o estoque disponível`,
        );
      }
      await tx.saleProduct.create({
        data: {
          saleId: sale.id,
          productId: product.id,
          quantity: product.quantity,
          unitPrice: productFromDb.price,
        },
      });
      await tx.product.update({
        where: {
          id: product.id,
        },
        data: {
          stock: {
            decrement: product.quantity,
          },
        },
      });
    }
  });
  revalidateTag("get-products");
};
