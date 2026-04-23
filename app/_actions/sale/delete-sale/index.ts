"use server";

import { db } from "@/app/_lib/prisma";
import { actionClient } from "@/app/_lib/safe-action";
import { revalidatePath, revalidateTag } from "next/cache";

import { deleteSaleSchema } from "./schema";

export const deleteSale = actionClient
  .schema(deleteSaleSchema)
  .action(async ({ parsedInput: { id } }) => {
    await db.$transaction(async (tx) => {
      const sale = await tx.sale.findUnique({
        where: { id },
        include: {
          products: true,
        },
      });
      await tx.sale.delete({
        where: {
          id,
        },
      });
      for (const product of sale?.products || []) {
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
    revalidatePath("/sales");
    revalidateTag("get-products");
  });
