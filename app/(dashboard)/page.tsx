import { Suspense } from "react";

import {
  Header,
  HeaderLeft,
  HeaderSubtitle,
  HeaderTitle,
} from "../_components/header";
import { Skeleton } from "../_components/ui/skeleton";
import Last14DaysRevenueCard from "./_components/last-14-days-revenue-card";
import MostSoldProducts from "./_components/most-sold-products";
import { MostSoldProductsItemSkeleton } from "./_components/most-sold-products-item";
import { SummarCardSkeleton } from "./_components/summary-card";
import TodayRevenueCard from "./_components/today-revenue-card";
import TotalProductsCard from "./_components/total-products-card";
import TotalRevenueCard from "./_components/total-revenue-card";
import TotalSalesCard from "./_components/total-sales-card";
import TotalStockCard from "./_components/total-stock-card";

const Home = async () => {
  return (
    <div className="m-4 w-full space-y-8 rounded-2xl flex flex-col">
      <Header>
        <HeaderLeft>
          <HeaderSubtitle>Visão geral</HeaderSubtitle>
          <HeaderTitle>Dashboard</HeaderTitle>
        </HeaderLeft>
      </Header>
      <div className="grid grid-cols-2 gap-6">
        {/* RECEITA TOTAL  */}
        <Suspense fallback={<SummarCardSkeleton />}>
          <TotalRevenueCard />
        </Suspense>
        {/* RECEITA DE HOJE  */}
        <Suspense fallback={<SummarCardSkeleton />}>
          <TodayRevenueCard />
        </Suspense>
      </div>
      <div className="grid grid-cols-3 gap-6">
        {/* TOTAL DE VENDAS  */}
        <Suspense fallback={<SummarCardSkeleton />}>
          <TotalSalesCard />
        </Suspense>
        {/* TOTAL EM ESTOQUE  */}
        <Suspense fallback={<SummarCardSkeleton />}>
          <TotalStockCard />
        </Suspense>
        {/* TOTAL DE PRODUTOS  */}
        <Suspense fallback={<SummarCardSkeleton />}>
          <TotalProductsCard />
        </Suspense>
      </div>
      <div className="grid min-h-0 grid-cols-[minmax(0,2.5fr),minmax(0,1fr)] gap-6">
        <Suspense
          fallback={
            <Skeleton className="bg-white ">
              <div className="p-6 space-y-2">
                <Skeleton className="h-5 w-1/6" />
                <Skeleton className="h-4 w-2/6" />
              </div>
            </Skeleton>
          }
        >
          <Last14DaysRevenueCard />
        </Suspense>
        <Suspense fallback={<MostSoldProductsItemSkeleton />}>
          <MostSoldProducts />
        </Suspense>
      </div>
    </div>
  );
};

export default Home;
