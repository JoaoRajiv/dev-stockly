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
import { toast } from "sonner";

interface DeleteProductDialogContentProps {
  productId: string;
}

const DeleteProductDialogContent = ({
  productId,
}: DeleteProductDialogContentProps) => {
  const handleDeleteClick = async () => {
    try {
      await deleteProduct({ id: productId });
      toast.success("Produto deletado com sucesso");
    } catch (error) {
      toast.error("Erro ao deletar produto");
      console.error("Erro ao deletar produto:", error);
    }
  };
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
