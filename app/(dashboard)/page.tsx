import { DollarSignIcon } from "lucide-react";

import {
  Header,
  HeaderLeft,
  HeaderSubtitle,
  HeaderTitle,
} from "../_components/header";
import SummaryCard from "./summary-card";

export default function Home() {
  return (
    <div className="m-4 w-full space-y-8 rounded-2xl  ">
      <Header>
        <HeaderLeft>
          <HeaderSubtitle>Visão geral</HeaderSubtitle>
          <HeaderTitle>Dashboard</HeaderTitle>
        </HeaderLeft>
      </Header>
      <div className="grid grid-cols-2 gap-6">
        <SummaryCard
          icon={<DollarSignIcon />}
          title="Receita Total"
          value="$12,345"
        />
      </div>
    </div>
  );
}
