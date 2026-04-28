import { getTotalStock } from "@/app/_data-access/dashboard/get-total-stock";
import { PackageIcon } from "lucide-react";

import SummaryCard, {
  SummarryCardIcon,
  SummaryCardTitle,
  SummaryCardValue,
} from "./summary-card";

const TotalStockCard = () => {
  const totalStock = getTotalStock();
  return (
    <SummaryCard>
      <SummarryCardIcon>
        <PackageIcon />
      </SummarryCardIcon>
      <SummaryCardTitle>Total em Estoque</SummaryCardTitle>
      <SummaryCardValue>{totalStock}</SummaryCardValue>
    </SummaryCard>
  );
};

export default TotalStockCard;
