import { Skeleton } from "@/app/_components/ui/skeleton";
import { getMostSoldProducts } from "@/app/_data-access/dashboard/get-most-sold-products";

import MostSoldProductsItem from "./most-sold-products-item";

const MostSoldProducts = async () => {
  const mostSoldProducts = await getMostSoldProducts();
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-md">
      <p className="p-6 text-lg font-semibold text-slate-900">
        Produtos mais vendidos
      </p>

      <div className="space-y-7 overflow-y-auto px-6 pb-6">
        {mostSoldProducts.map((product) => (
          <MostSoldProductsItem
            key={product.productId}
            product={product as any}
          />
        ))}
      </div>
    </div>
  );
};

export const MostSoldProductsItemSkeleton = () => {
  return (
    <Skeleton className="bg-white ">
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

export default MostSoldProducts;
