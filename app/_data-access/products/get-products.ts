import { db } from "@/app/_lib/prisma";
import { Product } from "@prisma/client";

export const getProducts = async (): Promise<Product[]> => {
  console.log("Fetching products from database...");
  return db.product.findMany();
};
