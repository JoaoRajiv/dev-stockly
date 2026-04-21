"use server";

import { db } from "@/app/_lib/prisma";
import { deleteProductSchema } from "./schema";
import { revalidateTag } from "next/cache";
import { actionClient } from "@/app/_lib/safe-action";

export const deleteProduct = actionClient
  .schema(deleteProductSchema)
  .action(async ({ parsedInput: { id } }) => {
    await db.product.delete({
      where: {
        id,
      },
    });
    console.log("Produto deletado com id:", id);
    revalidateTag("get-products");
  });
