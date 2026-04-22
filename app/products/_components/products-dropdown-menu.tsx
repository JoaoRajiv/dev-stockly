import {
  AlertDialog,
  AlertDialogTrigger,
} from "@/app/_components/ui/alert-dialog";
import { Button } from "@/app/_components/ui/button";
import { Dialog, DialogTrigger } from "@/app/_components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";
import { ProductDto } from "@/app/_data-access/products/get-products";
import {
  ClipboardCopyIcon,
  MoreHorizontalIcon,
  PencilIcon,
  TrashIcon,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import DeleteProductDialogContent from "./delete-dialog";
import UpsertProductDialogContent from "./upsert-dialog-content";

const handleClipboardCopy = (text: string, productName: string) => {
  navigator.clipboard.writeText(text);
  toast.success(`ID do produto "${productName}" copiado!`);
};

interface ProductDropdownMenuProps {
  product: ProductDto;
}

const ProductDropdownMenu = ({ product }: ProductDropdownMenuProps) => {
  const [editDialogIsOpen, setEditDialogIsOpen] = useState(false);
  return (
    <AlertDialog>
      <Dialog open={editDialogIsOpen} onOpenChange={setEditDialogIsOpen}>
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
            <DialogTrigger asChild>
              <DropdownMenuItem>
                <PencilIcon size={16} />
                Editar
              </DropdownMenuItem>
            </DialogTrigger>
            <AlertDialogTrigger asChild>
              <DropdownMenuItem>
                <TrashIcon size={16} />
                Excluir
              </DropdownMenuItem>
            </AlertDialogTrigger>
          </DropdownMenuContent>
        </DropdownMenu>
        <UpsertProductDialogContent
          defaultValues={{
            id: product.id,
            name: product.name,
            price: Number(product.price),
            stock: product.stock,
          }}
          setDialogIsOpen={setEditDialogIsOpen}
        />
        <DeleteProductDialogContent productId={product.id} />
      </Dialog>
    </AlertDialog>
  );
};

export default ProductDropdownMenu;
