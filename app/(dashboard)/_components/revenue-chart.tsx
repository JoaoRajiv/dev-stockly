"use client";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import { DayTotalRevenueDto } from "@/app/_data-access/dashboard/get-last-14-days-revenue";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../../_components/ui/chart";

const chartConfig: ChartConfig = {
  totalRevenue: {
    label: "Receita",
  },
};

interface RevenueChartData {
  data: DayTotalRevenueDto[];
}

const RevenueChart = ({ data }: RevenueChartData) => {
  return (
    <ChartContainer config={chartConfig} className="min-h-0 w-full">
      <BarChart accessibilityLayer data={data}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="day"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="totalRevenue" fill="hsl(173, 80%, 32%)" radius={6} />
      </BarChart>
    </ChartContainer>
  );
};

export default RevenueChart;
