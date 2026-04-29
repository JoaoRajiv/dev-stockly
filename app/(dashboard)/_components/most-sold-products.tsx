import { Skeleton } from "@/app/_components/ui/skeleton";
import { getMostSoldProducts } from "@/app/_data-access/dashboard/get-most-sold-products";

import MostSoldProductsItem from "./most-sold-products-item";

const MostSoldProducts = async () => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const mostSoldProducts = await getMostSoldProducts();
  return (
    <div className="flex flex-col h-full overflow-hidden rounded-2xl bg-white shadow-md">
      <p className=" p-6 text-lg font-semibold">Produtos mais vendidos</p>
      <div className="overflow-y-auto space-y-7 px-6 pb-6">
        {mostSoldProducts.map((product) => (
          <MostSoldProductsItem key={product.productId} product={product} />
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
