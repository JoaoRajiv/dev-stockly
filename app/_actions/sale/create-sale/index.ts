"use server";

import { db } from "@/app/_lib/prisma";
import { createSaleSchema } from "./schema";
import { revalidateTag } from "next/cache";
import { actionClient } from "@/app/_lib/safe-action";
import { returnValidationErrors } from "next-safe-action";

export const createSale = actionClient
  .schema(createSaleSchema)
  .action(async ({ parsedInput: { products } }) => {
    await db.$transaction(async (tx) => {
      const sale = await tx.sale.create({
        data: {
          date: new Date(),
        },
      });
      for (const product of products) {
        const productFromDb = await db.product.findUnique({
          where: {
            id: product.id,
          },
        });
        if (!productFromDb) {
          returnValidationErrors(createSaleSchema, {
            _errors: [`Produto com id ${product.id} não encontrado`],
          });
        }
        if (product.quantity > productFromDb.stock) {
          returnValidationErrors(createSaleSchema, {
            _errors: [
              `Quantidade do produto ${productFromDb.name} excede o estoque disponível`,
            ],
          });
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
  });
