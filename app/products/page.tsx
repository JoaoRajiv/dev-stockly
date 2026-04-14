import { PlusIcon } from "lucide-react";
import { Button } from "@/app/_components/ui/button";
import { db } from "@/app/_lib/prisma";
import { DataTable } from "../_components/ui/data-table";
import { productTableColumns } from "./_components/table-columns";
import { Card } from "../_components/ui/card";

export default async function Home() {
  // chamar banco
  const products = await db.product.findMany();
  return (
    <Card className="m-4 w-full space-y-8 p-8">
      <div className="flex w-full items-center justify-between">
        {/* Esquerda  */}
        <div className="space-y-1">
          <span className="text-xs font-semibold text-foreground">
            Gestão de Produtos
          </span>
          <h2 className="text-2xl font-semibold">Produtos</h2>
        </div>
        {/* Direita  */}
        <Button>
          <PlusIcon size={20} />
          Adicionar Produto
        </Button>
      </div>
      <DataTable columns={productTableColumns} data={products} />
    </Card>
  );
}
