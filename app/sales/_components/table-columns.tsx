"use client";

import { Button } from "@/app/_components/ui/button";
import { SalesDTO } from "@/app/_data-access/sale/get-sales";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontalIcon } from "lucide-react";

export const saleTableColumns: ColumnDef<SalesDTO>[] = [
  {
    accessorKey: "productNames",
    header: "Produtos",
  },
  {
    accessorKey: "totalProducts",
    header: "Quantidade",
  },
  {
    accessorKey: "totalValue",
    header: "Valor Total",
    cell: ({
      row: {
        original: { totalValue },
      },
    }) => <span>R$ {totalValue}</span>,
  },
  {
    accessorKey: "date",
    header: "Data",
    cell: ({
      row: {
        original: { date },
      },
    }) => new Date(date).toLocaleDateString("pt-BR"),
  },
  {
    header: "Ações",
    cell: () => (
      <Button variant="ghost" size="sm">
        <MoreHorizontalIcon size={20} />
      </Button>
    ),
  },
];
