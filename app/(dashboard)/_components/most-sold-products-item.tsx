import ProductStatusBadge from "@/app/_components/product-status-badge";
import { MostSoldProductDto } from "@/app/_data-access/dashboard/get-dashboard";
import { formatCurrency } from "@/app/_helpers/currency";

interface MostSoldProductProps {
  product: MostSoldProductDto;
}

const MostSoldProductsItem = ({ product }: MostSoldProductProps) => {
  return (
    <div className="flex items-center justify-between rounded-lg ">
      <div className="space-y-1">
        <ProductStatusBadge status={product.status} />
        <p className="font-semibold">{product.name}</p>
        <p className="text-sm text-muted-foreground">
          {formatCurrency(product.price)}
        </p>
      </div>
      <div>
        <p className="font-semibold text-foreground text-sm">
          {product.totalSold} vendidos
        </p>
      </div>
    </div>
  );
};
export default MostSoldProductsItem;
