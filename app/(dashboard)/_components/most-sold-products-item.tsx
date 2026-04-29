import ProductStatusBadge from "@/app/_components/product-status-badge";
import { Skeleton } from "@/app/_components/ui/skeleton";
import { ProductStatusDto } from "@/app/_data-access/products/get-products";
import { formatCurrency } from "@/app/_helpers/currency";

export interface MostSoldProductDto {
  productId: string;
  name: string;
  totalSold: number;
  status: ProductStatusDto;
  price: number;
}

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

export const MostSoldProductsItemSkeleton = () => {
  return (
    <Skeleton className="bg-white p-6">
      <div className="space-y-2">
        <Skeleton className="h-[36px] w-5/6" />
        <div className="space-y-4">
          <Skeleton className="h-[76px] w-full" />
          <Skeleton className="h-[76px] w-full" />
          <Skeleton className="h-[76px] w-full" />
          <Skeleton className="h-[76px] w-full" />
        </div>
      </div>
    </Skeleton>
  );
};

export default MostSoldProductsItem;
