"use client";

import { cn } from "@/app/_lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "./ui/button";

interface SidebarButtonProps {
  children: React.ReactNode;
  href: string;
  className?: string;
}

const SidebarButton = ({ href, children, className }: SidebarButtonProps) => {
  const pathname = usePathname();
  return (
    <Button
      variant={pathname === href ? "secondary" : "ghost"}
      className={cn("justify-start gap-2", className)}
      asChild
    >
      <Link href={href}>{children}</Link>
    </Button>
  );
};

export default SidebarButton;
