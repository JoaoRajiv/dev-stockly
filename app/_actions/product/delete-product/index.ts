"use server";

import { db } from "@/app/_lib/prisma";
import { DeleteProductInput, deleteProductSchema } from "./schema";
import { revalidateTag } from "next/cache";

export const deleteProduct = async ({ id }: DeleteProductInput) => {
  deleteProductSchema.parse({ id });
  await db.product.delete({
    where: {
      id,
    },
  });
  revalidateTag("get-products");
};
