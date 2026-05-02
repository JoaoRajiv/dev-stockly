import { ReactNode } from "react";

import MobileNav from "./mobile-nav";

export const HeaderTitle = ({ children }: { children: ReactNode }) => {
  return <h2 className="text-2xl font-semibold">{children}</h2>;
};

export const HeaderSubtitle = ({ children }: { children: ReactNode }) => {
  return (
    <span className="text-xs font-semibold text-foreground">{children}</span>
  );
};

export const HeaderLeft = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex items-start gap-3">
      <MobileNav />
      <div className="space-y-1">{children}</div>
    </div>
  );
};

export const HeaderRight = ({ children }: { children: ReactNode }) => {
  return <div>{children}</div>;
};

export const Header = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex w-full items-center justify-between gap-4">
      {children}
    </div>
  );
};
