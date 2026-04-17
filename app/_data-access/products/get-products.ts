import { db } from "@/app/_lib/prisma";
import { Product } from "@prisma/client";
import { unstable_cache } from "next/cache";

export const getProducts = async (): Promise<Product[]> => {
  console.log("Fetching products from database...");
  return db.product.findMany();
};

export const cachedGetProducts = unstable_cache(getProducts, ["getProducts"], {
  tags: ["get-products"],
});
