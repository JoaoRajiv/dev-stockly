import { getProducts } from "@/app/_data-access/products/get-products";

export default async function ProductList() {
  const products = await getProducts();
  return (
    <div>
      {products.map((product) => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  );
}
