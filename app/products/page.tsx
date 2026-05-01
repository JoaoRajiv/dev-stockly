import {
  Header,
  HeaderLeft,
  HeaderRight,
  HeaderSubtitle,
  HeaderTitle,
} from "../_components/header";
import { DataTable } from "../_components/ui/data-table";
import { cachedGetProducts } from "../_data-access/products/get-products";
import AddProductButton from "./_components/create-product-button";
import { productTableColumns } from "./_components/table-columns";

const Products = async () => {
  // Chamar banco
  const products = await cachedGetProducts();
  return (
    <div className="m-4 w-full space-y-8 rounded-2xl bg-white p-8 shadow-md overflow-auto">
      <Header>
        <HeaderLeft>
          <HeaderSubtitle>Gestão de Produtos</HeaderSubtitle>
          <HeaderTitle>Produtos</HeaderTitle>
        </HeaderLeft>
        <HeaderRight>
          <AddProductButton />
        </HeaderRight>
      </Header>

      <DataTable
        columns={productTableColumns}
        data={JSON.parse(JSON.stringify(products))}
      />
    </div>
  );
};

export default Products;
