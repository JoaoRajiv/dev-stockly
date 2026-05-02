"use client";

import { MenuIcon } from "lucide-react";

import Sidebar from "./sidebar";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

export default function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          aria-label="Abrir menu"
        >
          <MenuIcon />
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="p-4">
        <SheetHeader className="mb-4">
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>

        <Sidebar variant="mobile" />
      </SheetContent>
    </Sheet>
  );
}
