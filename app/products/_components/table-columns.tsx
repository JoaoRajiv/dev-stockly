"use client";

import { Badge } from "@/app/_components/ui/badge";
import { Product } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { CircleIcon } from "lucide-react";

const getStatusLabel = (stock: number) => {
  if (stock === 0) return "Esgotado";
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
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price"));
      const formattedPrice = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(price);
      return formattedPrice;
    },
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
          variant={label === "Esgotado" ? "destructive" : "default"}
          className="gap-1.5 text-xs text-white"
        >
          <CircleIcon
            size={10}
            className={label === "Esgotado" ? "" : "text-secondary"}
          />
          {label}
        </Badge>
      );
    },
  },
];
