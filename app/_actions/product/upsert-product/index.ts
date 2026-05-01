"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/app/_lib/prisma";
import { actionClient } from "@/app/_lib/safe-action";

import { upsertProductSchema } from "./schema";

export const upsertProduct = actionClient
  .schema(upsertProductSchema)
  .action(async ({ parsedInput: { id, ...rest } }) => {
    await db.product.upsert({
      where: { id: id ?? "" },
      update: rest,
      create: rest,
    });
    revalidatePath("/products");
    revalidatePath("/");
  });
