"use client";

import { Badge } from "@/app/_components/ui/badge";
import { Product } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { CircleIcon } from "lucide-react";

const getStatusLabel = (stock: number) => {
  if (stock === 0) return "Esgotado";
  if (stock < 5) return "Baixo";
  return "Em estoque";
};

export const productTableColumns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: "Produto",
  },
  {
    accessorKey: "price",
    header: "Valor unit.",
  },
  {
    accessorKey: "stock",
    header: "Estoque",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const product = row.original;
      const label = getStatusLabel(product.stock);
      return (
        <Badge
          variant={
            label === "Esgotado"
              ? "destructive"
              : label === "Baixo"
                ? "secondary"
                : "default"
          }
          className="gap-1.5"
        >
          <CircleIcon
            size={10}
            className={
              label === "Esgotado"
                ? "text-destructive"
                : label === "Baixo"
                  ? "text-secondary"
                  : "text-green-500"
            }
          />
          {label}
        </Badge>
      );
    },
  },
];
