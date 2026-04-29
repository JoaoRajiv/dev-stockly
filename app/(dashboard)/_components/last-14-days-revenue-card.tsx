import { getLast14DaysRevenue } from "@/app/_data-access/dashboard/get-last-14-days-revenue";

import RevenueChart from "./revenue-chart";

const Last14DaysRevenueCard = async () => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const totalLast14DaysRevenue = await getLast14DaysRevenue();
  return (
    <div className="flex flex-col h-full overflow-hidden rounded-2xl bg-white p-6 shadow-md">
      <p className="text-lg font-semibold">Receita</p>
      <p className="text-sm text-gray-600">Últimos 14 dias</p>
      <RevenueChart data={totalLast14DaysRevenue} />
    </div>
  );
};

export default Last14DaysRevenueCard;
