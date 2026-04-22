import { DataTable } from "../_components/ui/data-table";
import { cachedGetProducts } from "../_data-access/products/get-products";
import AddProductButton from "./_components/create-product-button";
import { productTableColumns } from "./_components/table-columns";

export const revalidate = 10;

export default async function Home() {
  // Chamar banco
  const products = await cachedGetProducts();
  return (
    <div className="m-4 w-full space-y-8 rounded-2xl bg-white p-8 shadow-md">
      <div className="flex w-full items-center justify-between">
        <div className="space-y-1">
          <span className="text-xs font-semibold text-foreground">
            Gestão de Produtos
          </span>
          <h2 className="text-2xl font-semibold">Produtos</h2>
        </div>
        <AddProductButton />
      </div>

      <DataTable
        columns={productTableColumns}
        data={JSON.parse(JSON.stringify(products))}
      />
    </div>
  );
}
