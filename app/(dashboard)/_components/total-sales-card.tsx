import { getTotalSales } from "@/app/_data-access/dashboard/get-total-sales";
import { CircleDollarSignIcon } from "lucide-react";

import SummaryCard, {
  SummarryCardIcon,
  SummaryCardTitle,
  SummaryCardValue,
} from "./summary-card";

const TotalSalesCard = () => {
  const totalSales = getTotalSales();
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
