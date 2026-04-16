import { db } from "@/app/_lib/prisma";
import { Product } from "@prisma/client";
import { cache } from "react";

export const getProducts = async (): Promise<Product[]> => {
  console.log("Fetching products from database...");
  return db.product.findMany();
};

export const cachedGetProducts = cache(getProducts);
