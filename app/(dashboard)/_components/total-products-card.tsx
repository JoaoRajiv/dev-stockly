import { getTotalProducts } from "@/app/_data-access/dashboard/get-total-products";
import { ShoppingBasketIcon } from "lucide-react";

import SummaryCard, {
  SummarryCardIcon,
  SummaryCardTitle,
  SummaryCardValue,
} from "./summary-card";

const TotalProductsCard = () => {
  const totalProducts = getTotalProducts();
  return (
    <SummaryCard>
      <SummarryCardIcon>
        <ShoppingBasketIcon />
      </SummarryCardIcon>
      <SummaryCardTitle>Produtos</SummaryCardTitle>
      <SummaryCardValue>{totalProducts}</SummaryCardValue>
    </SummaryCard>
  );
};

export default TotalProductsCard;
