import { z } from "zod";

export const createSaleSchema = z.object({
  products: z.array(
    z.object({
      id: z.string().uuid(),
      quantity: z.number().min(1),
    }),
  ),
});

export type CreateSaleSchema = z.infer<typeof createSaleSchema>;
