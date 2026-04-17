import { DataTable } from "../_components/ui/data-table";
import { productTableColumns } from "./_components/table-columns";
import { Card } from "../_components/ui/card";
import { cachedGetProducts } from "../_data-access/products/get-products";
import AddProductButton from "./_components/create-product-button";

export const revalidate = 10;

export default async function Home() {
  // chamar banco
  const products = await cachedGetProducts();
  return (
    <Card className="m-4 w-full space-y-8 p-8">
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
    </Card>
  );
}
