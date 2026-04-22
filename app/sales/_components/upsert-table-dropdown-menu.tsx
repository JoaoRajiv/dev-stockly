import { AlertDialog } from "@/app/_components/ui/alert-dialog";
import { Button } from "@/app/_components/ui/button";
import { Dialog } from "@/app/_components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/app/_components/ui/dropdown-menu";
import { MoreHorizontalIcon, ClipboardCopyIcon, TrashIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Product } from "@prisma/client";

const handleClipboardCopy = (text: string, productName: string) => {
  navigator.clipboard.writeText(text);
  toast.success(`ID do produto "${productName}" copiado!`);
};

interface UpsertSalesDropDownMenuProps {
  product: Pick<Product, "id" | "name">;
  onDelete: (productId: string) => void;
}

const UpsertSalesDropDownMenu = ({
  product,
  onDelete,
}: UpsertSalesDropDownMenuProps) => {
  const [editDialogIsOpen, setEditDialogIsOpen] = useState(false);
  return (
    <AlertDialog>
      <Dialog open={editDialogIsOpen} onOpenChange={setEditDialogIsOpen}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost">
              <MoreHorizontalIcon size={20} className="rotate-90" />
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
            <DropdownMenuItem onClick={() => onDelete(product.id)}>
              <TrashIcon size={16} />
              Excluir
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </Dialog>
    </AlertDialog>
  );
};

export default UpsertSalesDropDownMenu;
