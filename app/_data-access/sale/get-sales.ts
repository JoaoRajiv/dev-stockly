import { db } from "@/app/_lib/prisma";

const getSales = () => {
  return db.sale.findMany({});
};

export default getSales;
