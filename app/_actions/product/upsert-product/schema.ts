import { z } from "zod";

export const upsertProductSchema = z.object({
  id: z.string().uuid().optional(),
  name: z
    .string()
    .min(1, { message: "O nome deve ter pelo menos 1 caractere." })
    .trim(),
  price: z
    .number()
    .positive({ message: "O preço deve ser um número positivo." }),
  stock: z.coerce
    .number()
    .int({ message: "O estoque deve ser um número inteiro." })
    .positive({ message: "O estoque deve ser um número positivo." }),
});

export type UpsertProductSchema = z.infer<typeof upsertProductSchema>;
