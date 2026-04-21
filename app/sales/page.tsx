// import { DataTable } from "../_components/ui/data-table";
import { getProducts } from "../_data-access/products/get-products";
import { ComboboxOption } from "../_components/ui/combobox";
import { Product } from "@prisma/client";
import CreateSaleButton from "./_components/create-sale-button";

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
        <CreateSaleButton
          products={formatedProducts}
          productsOptions={productsOptions}
        />
      </div>

      {/* <DataTable
        columns={productTableColumns}
        data={JSON.parse(JSON.stringify(products))}
      /> */}
    </div>
  );
};

export default SalesPage;
