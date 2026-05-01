import { ShoppingBasketIcon } from "lucide-react";

import { getTotalProducts } from "@/app/_data-access/dashboard/get-total-products";

import SummaryCard, {
  SummarryCardIcon,
  SummaryCardTitle,
  SummaryCardValue,
} from "./summary-card";

const TotalProductsCard = async () => {
  const totalProducts = await getTotalProducts();
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
