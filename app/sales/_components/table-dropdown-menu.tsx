import { deleteSale } from "@/app/_actions/sale/delete-sale";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/app/_components/ui/alert-dialog";
import { Button } from "@/app/_components/ui/button";
import { ComboboxOption } from "@/app/_components/ui/combobox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";
import { Sheet, SheetTrigger } from "@/app/_components/ui/sheet";
import { ProductDto } from "@/app/_data-access/products/get-products";
import { SalesDTO } from "@/app/_data-access/sale/get-sales";
import {
  ClipboardCopyIcon,
  MoreHorizontalIcon,
  PencilIcon,
  TrashIcon,
} from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";
import { toast } from "sonner";

import UpsertSheetContent from "./upsert-sheet-content";

interface SalesTableDropdownMenuProps {
  sale: Pick<SalesDTO, "id" | "saleProducts">;
  products: ProductDto[];
  productsOptions: ComboboxOption[];
}

const SalesTableDropdownMenu = ({
  sale,
  products,
  productsOptions,
}: SalesTableDropdownMenuProps) => {
  const [upsertSheetOpen, setUpsertSheetOpen] = useState(false);
  const { execute } = useAction(deleteSale, {
    onSuccess: () => {
      toast.success("Venda deletada com sucesso");
    },
    onError: () => {
      toast.error("Erro ao deletar venda");
    },
  });

  const handleClipboardCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`ID da venda copiada!`);
  };

  const handleDeleteSaleClick = () => execute({ id: sale.id });

  return (
    <Sheet open={upsertSheetOpen} onOpenChange={setUpsertSheetOpen}>
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

            <DropdownMenuItem onClick={() => handleClipboardCopy(sale.id)}>
              <ClipboardCopyIcon size={16} />
              Copiar ID
            </DropdownMenuItem>
            <SheetTrigger asChild>
              <DropdownMenuItem>
                <PencilIcon size={16} />
                Editar
              </DropdownMenuItem>
            </SheetTrigger>
            <AlertDialogTrigger asChild>
              <DropdownMenuItem>
                <TrashIcon size={16} />
                Excluir
              </DropdownMenuItem>
            </AlertDialogTrigger>
          </DropdownMenuContent>
        </DropdownMenu>
        <AlertDialogContent className="w-[400px]">
          <AlertDialogHeader>
            <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
            <AlertDialogDescription>
              Essa ação não pode ser desfeita. A venda será excluída
              permanentemente.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteSaleClick}>
              Continuar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <UpsertSheetContent
        productsOptions={productsOptions}
        products={products}
        onSuccess={() => {
          setUpsertSheetOpen(false);
        }}
        defaultSelectedProducts={sale.saleProducts.map((saleProduct) => ({
          id: saleProduct.id,
          quantity: saleProduct.quantity,
          name: saleProduct.productName,
          price: saleProduct.unitPrice,
        }))}
      ></UpsertSheetContent>
    </Sheet>
  );
};

export default SalesTableDropdownMenu;
