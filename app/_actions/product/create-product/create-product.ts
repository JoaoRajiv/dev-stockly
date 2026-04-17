"use server";

import { db } from "@/app/_lib/prisma";
import { revalidatePath } from "next/cache";
import { createProductSchema, CreateProductSchema } from "./schema";

export const createProduct = async (data: CreateProductSchema) => {
  createProductSchema.parse(data);
  try {
    await db.product.create({
      data,
    });
  } catch (error) {
    console.error("Error creating product:", error);
    throw new Error("Failed to create product");
  }
  revalidatePath("/products");
};
