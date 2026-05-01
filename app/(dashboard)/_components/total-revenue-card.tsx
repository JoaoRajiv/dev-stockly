import { DollarSignIcon } from "lucide-react";

import { getTotalRevenue } from "@/app/_data-access/dashboard/get-total-revenue";
import { formatCurrency } from "@/app/_helpers/currency";

import SummaryCard, {
  SummarryCardIcon,
  SummaryCardTitle,
  SummaryCardValue,
} from "./summary-card";

const TotalRevenueCard = async () => {
  const totalRevenue = await getTotalRevenue();
  return (
    <SummaryCard>
      <SummarryCardIcon>
        <DollarSignIcon />
      </SummarryCardIcon>
      <SummaryCardTitle>Receita Total</SummaryCardTitle>
      <SummaryCardValue>{formatCurrency(totalRevenue)}</SummaryCardValue>
    </SummaryCard>
  );
};

export default TotalRevenueCard;
