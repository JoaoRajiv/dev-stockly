"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/app/_lib/prisma";
import { actionClient } from "@/app/_lib/safe-action";

import { deleteSaleSchema } from "./schema";

export const deleteSale = actionClient
  .schema(deleteSaleSchema)
  .action(async ({ parsedInput: { id } }) => {
    await db.$transaction(async (tx) => {
      const sale = await tx.sale.findUnique({
        where: { id },
        include: {
          saleProducts: true,
        },
      });
      if (!sale) {
        throw new Error("Sale not found");
      }
      await tx.sale.delete({
        where: {
          id,
        },
      });
      for (const product of sale.saleProducts) {
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
    });
    revalidatePath("/", "layout");
  });
