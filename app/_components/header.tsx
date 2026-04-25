export const HeaderTitle = ({ children }: { children: React.ReactNode }) => {
  return <h2 className="text-2xl font-semibold">{children}</h2>;
};

export const HeaderSubtitle = ({ children }: { children: React.ReactNode }) => {
  return (
    <span className="text-xs font-semibold text-foreground">{children}</span>
  );
};

export const HeaderLeft = ({ children }: { children: React.ReactNode }) => {
  return <div className="space-y-1">{children}</div>;
};

export const HeaderRight = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>;
};

export const Header = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex w-full items-center justify-between">{children}</div>
  );
};
