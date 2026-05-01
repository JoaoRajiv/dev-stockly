import { PackageIcon } from "lucide-react";

import { getTotalStock } from "@/app/_data-access/dashboard/get-total-stock";

import SummaryCard, {
  SummarryCardIcon,
  SummaryCardTitle,
  SummaryCardValue,
} from "./summary-card";

const TotalStockCard = async () => {
  const totalStock = await getTotalStock();
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
