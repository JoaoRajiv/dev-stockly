import { ReactNode } from "react";

import { Card } from "../../_components/ui/card";

export const SummarryCardIcon = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex items-center justify-center h-9 w-9 rounded-md bg-primary/10 text-primary mb-2">
      {children}
    </div>
  );
};

export const SummaryCardTitle = ({ children }: { children: ReactNode }) => {
  return <h3 className="text-sm text-gray-600">{children}</h3>;
};

export const SummaryCardValue = ({ children }: { children: ReactNode }) => {
  return <p className="text-2xl font-bold text-gray-900 ">{children}</p>;
};

const SummaryCard = ({ children }: { children: ReactNode }) => {
  return <Card className="bg-white rounded-xl p-6">{children}</Card>;
};

export default SummaryCard;
