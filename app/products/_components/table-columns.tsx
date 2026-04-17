"use client";

import { Badge } from "@/app/_components/ui/badge";
import { Button } from "@/app/_components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";
import { Product } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import {
  ClipboardCopyIcon,
  MoreHorizontalIcon,
  PencilIcon,
  TrashIcon,
} from "lucide-react";

import {
  AlertDialog,
  AlertDialogTrigger,
} from "@/app/_components/ui/alert-dialog";
import DeleteProductDialogContent from "./delete-dialog";
import { toast } from "sonner";

const getStatusLabel = (stock: number) => {
  if (stock === 0) return "Esgotado";
  return "Em estoque";
};

const handleClipboardCopy = (text: string, productName: string) => {
  navigator.clipboard.writeText(text);
  toast.success(
    `ID do produto "${productName}" copiado para a área de transferência!`,
  );
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
      const product = row.original;
      return (
        <AlertDialog>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost">
                <MoreHorizontalIcon size={20} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Ações</DropdownMenuLabel>
              <DropdownMenuSeparator />

              <DropdownMenuItem
                onClick={() => handleClipboardCopy(product.id, product.name)}
              >
                <ClipboardCopyIcon size={16} />
                Copiar ID
              </DropdownMenuItem>
              <DropdownMenuItem>
                <PencilIcon size={16} />
                Editar
              </DropdownMenuItem>
              <AlertDialogTrigger asChild>
                <DropdownMenuItem>
                  <TrashIcon size={16} />
                  Excluir
                </DropdownMenuItem>
              </AlertDialogTrigger>
            </DropdownMenuContent>
          </DropdownMenu>
          <DeleteProductDialogContent productId={product.id} />
        </AlertDialog>
      );
    },
  },
];
