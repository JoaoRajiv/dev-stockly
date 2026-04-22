import { db } from "@/app/_lib/prisma";

export interface SaleProductDTO {
  id: string;
  name: string;
  quantity: number;
  unitPrice: number;
  productName: string;
}

export interface SalesDTO {
  id: string;
  productNames: string[];
  totalProducts: number;
  totalValue: number;
  date: Date;
  saleProducts: SaleProductDTO[];
}

const getSales = async (): Promise<SalesDTO[]> => {
  const sales = await db.sale.findMany({
    include: {
      products: {
        include: {
          product: true,
        },
      },
    },
  });
  // @ts-expect-error - This is needed to facilitate the serialization
  return sales.map((sale) => ({
    id: sale.id,
    date: sale.date,
    productNames: sale.products
      .map((saleProduct) => saleProduct.product.name)
      .join(" / "),
    totalProducts: sale.products.reduce(
      (acc, product) => acc + product.quantity,
      0,
    ),
    totalValue: sale.products.reduce(
      (acc, products) => acc + Number(products.unitPrice) * products.quantity,
      0,
    ),
    saleProducts: sale.products.map((saleProduct) => ({
      id: saleProduct.id,
      name: saleProduct.product.name,
      quantity: saleProduct.quantity,
      unitPrice: saleProduct.unitPrice,
      productName: saleProduct.product.name,
    })),
  }));
};

export default getSales;
