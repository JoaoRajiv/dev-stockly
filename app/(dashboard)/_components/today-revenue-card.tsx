import { DollarSignIcon } from "lucide-react";

import { getTodayRevenue } from "@/app/_data-access/dashboard/get-today-revenue";
import { formatCurrency } from "@/app/_helpers/currency";

import SummaryCard, {
  SummarryCardIcon,
  SummaryCardTitle,
  SummaryCardValue,
} from "./summary-card";

const TodayRevenueCard = async () => {
  const todayRevenue = await getTodayRevenue();
  return (
    <SummaryCard>
      <SummarryCardIcon>
        <DollarSignIcon />
      </SummarryCardIcon>
      <SummaryCardTitle>Receita Hoje</SummaryCardTitle>
      <SummaryCardValue>{formatCurrency(todayRevenue)}</SummaryCardValue>
    </SummaryCard>
  );
};

export default TodayRevenueCard;
