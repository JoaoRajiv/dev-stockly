import { CircleDollarSignIcon } from "lucide-react";

import { getTotalSales } from "@/app/_data-access/dashboard/get-total-sales";

import SummaryCard, {
  SummarryCardIcon,
  SummaryCardTitle,
  SummaryCardValue,
} from "./summary-card";

const TotalSalesCard = async () => {
  const totalSales = await getTotalSales();
  return (
    <SummaryCard>
      <SummarryCardIcon>
        <CircleDollarSignIcon />
      </SummarryCardIcon>
      <SummaryCardTitle>Vendas Totais</SummaryCardTitle>
      <SummaryCardValue>{totalSales}</SummaryCardValue>
    </SummaryCard>
  );
};

export default TotalSalesCard;
