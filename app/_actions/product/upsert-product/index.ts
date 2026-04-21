"use server";

import { db } from "@/app/_lib/prisma";
import { revalidateTag } from "next/cache";
import { upsertProductSchema } from "./schema";
import { actionClient } from "@/app/_lib/safe-action";

export const upsertProduct = actionClient
  .schema(upsertProductSchema)
  .action(async ({ parsedInput: { id, ...rest } }) => {
    await db.product.upsert({
      where: { id: id ?? "" },
      update: rest,
      create: rest,
    });
    revalidateTag("get-products");
  });
