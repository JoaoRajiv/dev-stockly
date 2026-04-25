import { Product } from "@prisma/client";

import {
  Header,
  HeaderLeft,
  HeaderRight,
  HeaderSubtitle,
  HeaderTitle,
} from "../_components/header";
import { ComboboxOption } from "../_components/ui/combobox";
import { DataTable } from "../_components/ui/data-table";
import { getProducts } from "../_data-access/products/get-products";
import { getSales } from "../_data-access/sale/get-sales";
import UpsertSaleButton from "./_components/create-sale-button";
import { saleTableColumns } from "./_components/table-columns";

const SalesPage = async () => {
  const sales = await getSales();
  const products = await getProducts();
  const formatedProducts = JSON.parse(JSON.stringify(products));
  const productsOptions: ComboboxOption[] = formatedProducts.map(
    (product: Product) => ({
      label: product.name,
      value: product.id,
    }),
  );
  const tableData = sales.map((sale) => ({
    ...sale,
    products,
    productsOptions,
  }));
  return (
    <div className="m-4 w-full space-y-8 rounded-2xl bg-white p-8 shadow-md">
      <Header>
        <HeaderLeft>
          <HeaderSubtitle>Gestão de Vendas</HeaderSubtitle>
          <HeaderTitle>Vendas</HeaderTitle>
        </HeaderLeft>
        <HeaderRight>
          <UpsertSaleButton
            products={formatedProducts}
            productsOptions={productsOptions}
          />
        </HeaderRight>
      </Header>

      <DataTable
        columns={saleTableColumns}
        data={JSON.parse(JSON.stringify(tableData))}
      />
    </div>
  );
};

export default SalesPage;
