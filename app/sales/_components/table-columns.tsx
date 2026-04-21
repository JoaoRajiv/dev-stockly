"use client";

import { Button } from "@/app/_components/ui/button";
import { Sale } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { MoreVerticalIcon } from "lucide-react";

export const saleTableColumns: ColumnDef<Sale>[] = [
  {
    accessorKey: "id",
    header: "Produtos",
  },
  {
    header: "Quantidade",
    cell: () => <span>30</span>,
  },
  {
    header: "Valor Total",
    cell: () => <span>R$ 100,00</span>,
  },
  {
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
        <MoreVerticalIcon size={20} />
      </Button>
    ),
  },
];
