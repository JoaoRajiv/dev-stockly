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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";
import { Sale } from "@prisma/client";
import { ClipboardCopyIcon, MoreHorizontalIcon, TrashIcon } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";

interface SalesTableDropdownMenuProps {
  sale: Pick<Sale, "id">;
}

const SalesTableDropdownMenu = ({ sale }: SalesTableDropdownMenuProps) => {
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
  );
};

export default SalesTableDropdownMenu;
