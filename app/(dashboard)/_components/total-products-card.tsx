import { getTotalProducts } from "@/app/_data-access/dashboard/get-total-products";
import { ShoppingBasketIcon } from "lucide-react";

import SummaryCard, {
  SummarryCardIcon,
  SummaryCardTitle,
  SummaryCardValue,
} from "./summary-card";

const TotalProductsCard = async () => {
  await new Promise((resolve) => setTimeout(resolve, 3000));
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
