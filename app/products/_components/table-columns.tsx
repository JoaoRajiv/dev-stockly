"use client";

import { Badge } from "@/app/_components/ui/badge";
import { Product } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

import ProductDropdownMenu from "./products-dropdown-menu";

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
      const product = row.original;
      return Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(Number(product.price));
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
          className={`gap-1.5 text-xs ${label === "Esgotado" ? "bg-destructive/10 text-destructive" : "bg-primary/10 text-primary"} px-1 hover:bg-transparent`}
        >
          <span
            className={`h-2.5 w-2.5 rounded-full ${label === "Esgotado" ? "bg-destructive" : "bg-primary"}`}
          />
          {label}
        </Badge>
      );
    },
  },
  {
    accessorKey: "actions",
    header: "Ações",
    cell: ({ row }) => {
      return <ProductDropdownMenu product={row.original} />;
    },
  },
];
