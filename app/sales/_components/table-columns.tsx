"use client";

import { Button } from "@/app/_components/ui/button";
import { ComboboxOption } from "@/app/_components/ui/combobox";
import { ProductDto } from "@/app/_data-access/products/get-products";
import { SaleDto } from "@/app/_data-access/sale/get-sales";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import SalesTableDropdownMenu from "./table-dropdown-menu";

interface SaleTableColumn extends SaleDto {
  products: ProductDto[];
  productsOptions: ComboboxOption[];
}

export const saleTableColumns: ColumnDef<SaleTableColumn>[] = [
  {
    accessorKey: "productNames",
    header: "Produtos",
  },
  {
    accessorKey: "totalProducts",
    header: "Quantidade",
  },
  {
    accessorKey: "totalAmount",
    header: "Valor Total",
    cell: ({
      row: {
        original: { totalAmount },
      },
    }) => <span>R$ {totalAmount.toFixed(2)}</span>,
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
      <SalesTableDropdownMenu
        products={sale.products}
        productsOptions={sale.productsOptions}
        sale={sale}
      />
    ),
  },
];
