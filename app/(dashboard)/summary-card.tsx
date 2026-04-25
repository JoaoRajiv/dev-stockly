interface SummaryCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
}

const SummaryCard = ({ title, value, icon }: SummaryCardProps) => {
  return (
    <div className="bg-white rounded-xl p-6">
      <div className="flex items-center justify-center h-9 w-9 rounded-md bg-primary/10 text-primary mb-2">
        {icon}
      </div>
      <h3 className="text-sm font-semibold text-gray-800">{title}</h3>
      <p className="text-2xl font-bold text-gray-900 ">{value}</p>
    </div>
  );
};

export default SummaryCard;
