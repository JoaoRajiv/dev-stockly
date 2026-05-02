"use client";
import { LayoutGridIcon, PackageIcon, ShoppingBasketIcon } from "lucide-react";

import SidebarButton from "./sidebar-button";

type SidebarVariant = "desktop" | "mobile";

export default function Sidebar({
  variant = "desktop",
}: {
  variant?: SidebarVariant;
}) {
  const isDesktop = variant === "desktop";

  return (
    <nav
      className={
        isDesktop
          ? "hidden md:sticky md:top-0 md:block md:h-dvh md:w-20 md:rounded-r-2xl md:border md:bg-white md:overflow-y-auto lg:w-64"
          : "w-full rounded-2xl border bg-white"
      }
    >
      {/* LOGO  */}
      <div className="px-8 py-6">
        <h1 className="text-2xl font-bold text-primary">
          {isDesktop ? (
            <>
              <span className="lg:hidden">S</span>
              <span className="hidden lg:inline">Stockly</span>
            </>
          ) : (
            "Stockly"
          )}
        </h1>
      </div>
      {/* BOTÕES */}
      <div className="flex flex-col gap-2 p-2">
        <SidebarButton
          href="/"
          className={
            isDesktop ? "md:justify-center lg:justify-start" : undefined
          }
        >
          <LayoutGridIcon size={20} />
          {isDesktop ? (
            <span className="hidden lg:inline">Dashboard</span>
          ) : (
            "Dashboard"
          )}
        </SidebarButton>
        <SidebarButton
          href="/products"
          className={
            isDesktop ? "md:justify-center lg:justify-start" : undefined
          }
        >
          <PackageIcon size={20} />
          {isDesktop ? (
            <span className="hidden lg:inline">Produtos</span>
          ) : (
            "Produtos"
          )}
        </SidebarButton>
        <SidebarButton
          href="/sales"
          className={
            isDesktop ? "md:justify-center lg:justify-start" : undefined
          }
        >
          <ShoppingBasketIcon size={20} />
          {isDesktop ? (
            <span className="hidden lg:inline">Vendas</span>
          ) : (
            "Vendas"
          )}
        </SidebarButton>
      </div>
    </nav>
  );
}
