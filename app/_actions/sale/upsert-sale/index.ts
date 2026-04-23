"use server";

import { db } from "@/app/_lib/prisma";
import { actionClient } from "@/app/_lib/safe-action";
import { returnValidationErrors } from "next-safe-action";
import { revalidatePath } from "next/cache";

import { upsertSaleSchema } from "./schema";

export const upsertSale = actionClient
  .schema(upsertSaleSchema)
  .action(async ({ parsedInput: { products, id } }) => {
    const isUpdating = Boolean(id);

    // TRANSACTION
    await db.$transaction(async (tx) => {
      if (isUpdating) {
        const existingSale = await tx.sale.findUnique({
          where: { id },
          include: {
            saleProducts: true,
          },
        });
        if (!existingSale) return;

        await tx.sale.delete({
          where: { id },
        });
        for (const product of existingSale.saleProducts) {
          await tx.product.update({
            where: {
              id: product.productId,
            },
            data: {
              stock: {
                increment: product.quantity,
              },
            },
          });
        }
      }
      const sale = await tx.sale.create({
        data: {
          date: new Date(),
        },
      });
      for (const product of products) {
        console.log("Processing product", product);
        const productFromDb = await tx.product.findUnique({
          where: {
            id: product.id,
          },
        });
        console.log("productFromDb", productFromDb);
        if (!productFromDb) {
          returnValidationErrors(upsertSaleSchema, {
            _errors: [`Produto com id ${product.id} não encontrado`],
          });
        }
        const productIsOutOfStock = product.quantity > productFromDb.stock;
        if (productIsOutOfStock) {
          returnValidationErrors(upsertSaleSchema, {
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
    revalidatePath("/products");
    revalidatePath("/sales");
  });
