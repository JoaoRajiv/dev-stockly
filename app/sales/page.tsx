import { PlusIcon } from "lucide-react";
import { Button } from "../_components/ui/button";
// import { DataTable } from "../_components/ui/data-table";
import { Sheet, SheetTrigger } from "../_components/ui/sheet";
import UpsertSheetContent from "./_components/upsert-sheet-content";
import { getProducts } from "../_data-access/products/get-products";
import { ComboboxOption } from "../_components/ui/combobox";
import { Product } from "@prisma/client";

const SalesPage = async () => {
  const products = await getProducts();
  const formatedProducts = JSON.parse(JSON.stringify(products));
  const productsOptions: ComboboxOption[] = formatedProducts.map(
    (product: Product) => ({
      label: product.name,
      value: product.id,
    }),
  );
  return (
    <div className="m-4 w-full space-y-8 rounded-2xl bg-white p-8 shadow-md">
      <div className="flex w-full items-center justify-between">
        <div className="space-y-1">
          <span className="text-xs font-semibold text-foreground">
            Gestão de Produtos
          </span>
          <h2 className="text-2xl font-semibold">Vendas</h2>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button>
              <PlusIcon />
              Adicionar Produto
            </Button>
          </SheetTrigger>
          <UpsertSheetContent
            products={formatedProducts}
            productsOptions={productsOptions}
          />
        </Sheet>
      </div>

      {/* <DataTable
        columns={productTableColumns}
        data={JSON.parse(JSON.stringify(products))}
      /> */}
    </div>
  );
};

export default SalesPage;
