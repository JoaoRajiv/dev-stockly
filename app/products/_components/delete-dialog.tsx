import { deleteProduct } from "@/app/_actions/product/delete-product";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/app/_components/ui/alert-dialog";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";

interface DeleteProductDialogContentProps {
  productId: string;
}

const DeleteProductDialogContent = ({
  productId,
}: DeleteProductDialogContentProps) => {
  const { execute: executeDeleteProduct } = useAction(deleteProduct, {
    onSuccess: () => {
      toast.success("Produto deletado com sucesso");
    },
    onError: () => {
      toast.error("Erro ao deletar produto");
    },
  });
  const handleDeleteClick = () => executeDeleteProduct({ id: productId });
  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
        <AlertDialogDescription>
          Essa ação não pode ser desfeita. O produto será excluído
          permanentemente.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancelar</AlertDialogCancel>
        <AlertDialogAction onClick={handleDeleteClick}>
          Continuar
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
};

export default DeleteProductDialogContent;
