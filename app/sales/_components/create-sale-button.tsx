"use client";
import { PlusIcon } from "lucide-react";
import { Button } from "@/app/_components/ui/button";
import { Sheet, SheetTrigger } from "@/app/_components/ui/sheet";
import UpsertSheetContent from "../_components/upsert-sheet-content";
import { Product } from "@prisma/client";
import { ComboboxOption } from "@/app/_components/ui/combobox";
import { useState } from "react";

interface CreateSaleButtonProps {
  products: Product[];
  productsOptions: ComboboxOption[];
}

const CreateSaleButton = (props: CreateSaleButtonProps) => {
  const [sheetIsOpnen, setSheetIsOpen] = useState(false);
  return (
    <Sheet open={sheetIsOpnen} onOpenChange={setSheetIsOpen}>
      <SheetTrigger asChild>
        <Button>
          <PlusIcon />
          Adicionar Produto
        </Button>
      </SheetTrigger>
      <UpsertSheetContent onSuccess={() => setSheetIsOpen(false)} {...props} />
    </Sheet>
  );
};

export default CreateSaleButton;
