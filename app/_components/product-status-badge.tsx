import { ProductStatusDto } from "../_data-access/products/get-products";
import { Badge } from "./ui/badge";

const getStatusLabel = (status: string) => {
  if (status === "IN_STOCK") {
    return "Em estoque";
  }
  return "Fora de estoque";
};

interface ProductStatusBadgeProps {
  status: ProductStatusDto;
}

const ProductStatusBadge = ({ status }: ProductStatusBadgeProps) => {
  const label = getStatusLabel(status);
  return (
    <Badge
      variant={label === "Em estoque" ? "destructive" : "default"}
      className={`gap-1.5 text-xs ${label === "Fora de estoque" ? "bg-destructive/10 text-destructive" : "bg-primary/10 text-primary"} px-1 hover:bg-transparent`}
    >
      <span
        className={`h-2.5 w-2.5 rounded-full ${label === "Fora de estoque" ? "bg-destructive" : "bg-primary"}`}
      />
      {label}
    </Badge>
  );
};

export default ProductStatusBadge;
