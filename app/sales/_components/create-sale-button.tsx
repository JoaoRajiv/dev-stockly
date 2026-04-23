"use client";
import { Button } from "@/app/_components/ui/button";
import { ComboboxOption } from "@/app/_components/ui/combobox";
import { Sheet, SheetTrigger } from "@/app/_components/ui/sheet";
import { Product } from "@prisma/client";
import { PlusIcon } from "lucide-react";
import { useState } from "react";

import UpsertSheetContent from "../_components/upsert-sheet-content";

interface UpsertSaleButtonProps {
  products: Product[];
  productsOptions: ComboboxOption[];
}

const UpsertSaleButton = (props: UpsertSaleButtonProps) => {
  const [sheetIsOpnen, setSheetIsOpen] = useState(false);
  return (
    <Sheet open={sheetIsOpnen} onOpenChange={setSheetIsOpen}>
      <SheetTrigger asChild>
        <Button>
          <PlusIcon />
          Nova venda
        </Button>
      </SheetTrigger>
      <UpsertSheetContent onSuccess={() => setSheetIsOpen(false)} {...props} />
    </Sheet>
  );
};

export default UpsertSaleButton;
