"use client";

import { Button } from "@/app/_components/ui/button";
import { SalesDTO } from "@/app/_data-access/sale/get-sales";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import SalesTableDropdownMenu from "./table-dropdown-menu";

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
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Data
          <ArrowUpDown className="h-4 w-4" />
        </Button>
      );
    },
    cell: ({
      row: {
        original: { date },
      },
    }) => new Date(date).toLocaleDateString("pt-BR"),
  },
  {
    header: "Ações",
    cell: ({ row: { original: sale } }) => (
      <SalesTableDropdownMenu sale={sale} />
    ),
  },
];
