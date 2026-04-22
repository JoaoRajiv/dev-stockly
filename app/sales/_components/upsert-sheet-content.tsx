"use client";
import { createSale } from "@/app/_actions/sale/create-sale";
import { Button } from "@/app/_components/ui/button";
import { Combobox, ComboboxOption } from "@/app/_components/ui/combobox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/_components/ui/form";
import { Input } from "@/app/_components/ui/input";
import {
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/app/_components/ui/sheet";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/_components/ui/table";
import { ProductDto } from "@/app/_data-access/products/get-products";
import { formatCurrency } from "@/app/_helpers/currency";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckIcon, PlusIcon } from "lucide-react";
import { flattenValidationErrors } from "next-safe-action";
import { useAction } from "next-safe-action/hooks";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import UpsertSalesDropDownMenu from "./upsert-table-dropdown-menu";

const formSchema = z.object({
  productId: z.string().uuid({
    message: "Selecione um produto válido",
  }),
  quantity: z.coerce.number().int().positive(),
});

type FormSchema = z.infer<typeof formSchema>;

interface UpsertSheetContentProps {
  products: ProductDto[];
  productsOptions: ComboboxOption[];
  onSuccess: () => void;
  defaultSelectedProducts?: SelectedProduct[];
}

interface SelectedProduct {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

const UpsertSheetContent = ({
  products,
  productsOptions,
  onSuccess,
  defaultSelectedProducts,
}: UpsertSheetContentProps) => {
  const [selectedProduct, setSelectedProduct] = useState<SelectedProduct[]>(
    defaultSelectedProducts ?? [],
  );

  const { execute: executeCreateSale } = useAction(createSale, {
    onError: ({ error: { validationErrors, serverError } }) => {
      const flattenedErrors = flattenValidationErrors(validationErrors);
      toast.error(serverError ?? flattenedErrors.formErrors[0]);
    },
    onSuccess: () => {
      toast.success("Venda criada com sucesso!");
      setSelectedProduct([]);
      onSuccess();
    },
  });

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productId: "",
      quantity: 1,
    },
  });
  const onSubmit = (data: FormSchema) => {
    const selectedProduct = products.find(
      (product) => product.id === data.productId,
    );

    if (!selectedProduct) return;
    setSelectedProduct((currentProducts) => {
      const existingProduct = currentProducts.find(
        (product) => product.id === selectedProduct.id,
      );

      if (existingProduct) {
        const productIsOutOfStock =
          existingProduct.quantity + data.quantity > selectedProduct.stock;
        if (productIsOutOfStock) {
          form.setError("quantity", {
            message: `Quantidade excede o estoque disponível (${selectedProduct.stock})`,
          });
          return currentProducts;
        }
        form.reset();
        return currentProducts.map((product) => {
          if (product.id === selectedProduct.id) {
            return {
              ...product,
              quantity: product.quantity + data.quantity,
            };
          }
          return product;
        });
      }
      const productIsOutOfStock = data.quantity > selectedProduct.stock;
      if (productIsOutOfStock) {
        form.setError("quantity", {
          message: `Quantidade excede o estoque disponível (${selectedProduct.stock})`,
        });
        return currentProducts;
      }
      form.reset();
      return [
        ...currentProducts,
        {
          ...selectedProduct,
          price: Number(selectedProduct.price),
          quantity: data.quantity,
        },
      ];
    });
  };

  const productsTotalPrice = useMemo(() => {
    return selectedProduct.reduce(
      (total, product) => total + product.price * product.quantity,
      0,
    );
  }, [selectedProduct]);

  const onDelete = (productId: string) => {
    setSelectedProduct((currentProducts) =>
      currentProducts.filter((product) => product.id !== productId),
    );
  };

  const onSubmitSale = async () => {
    executeCreateSale({
      products: selectedProduct.map((product) => ({
        id: product.id,
        quantity: product.quantity,
      })),
    });
  };

  return (
    <SheetContent className="!max-w-[700px] space-y-6">
      <SheetHeader className="py-6">
        <SheetTitle>Nova venda</SheetTitle>
        <SheetDescription>Insira as informações da nova venda</SheetDescription>
      </SheetHeader>
      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="productId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Produto</FormLabel>
                <FormControl>
                  <Combobox
                    {...field}
                    placeholder="Selecione um produto"
                    options={productsOptions}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantidade</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Digite o nome do produto"
                    onFocus={(e) => {
                      e.target.select();
                      form.clearErrors("quantity");
                    }}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button variant="secondary" className="w-full">
            <PlusIcon />
            Adicionar produto à venda
          </Button>
        </form>
      </Form>
      {/* Tabela  */}
      <Table>
        <TableCaption>
          <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
            <div className="h-3 w-3 animate-fade rounded-full bg-green-500"></div>
            <p>Produtos adicionados à venda</p>
          </div>
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Produto</TableHead>
            <TableHead>Preço unit.</TableHead>
            <TableHead className="text-center">Quantidade</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {selectedProduct.map((product) => (
            <TableRow key={product.id}>
              <TableCell className="font-medium">{product.name}</TableCell>
              <TableCell>{formatCurrency(product.price)}</TableCell>
              <TableCell className="text-center">{product.quantity}</TableCell>
              <TableCell>
                {formatCurrency(product.price * product.quantity)}
              </TableCell>
              <TableCell>
                <UpsertSalesDropDownMenu
                  onDelete={onDelete}
                  product={{ id: product.id, name: product.name }}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell>{formatCurrency(productsTotalPrice)}</TableCell>
            <TableCell />
          </TableRow>
        </TableFooter>
      </Table>
      <SheetFooter>
        <Button
          disabled={selectedProduct.length === 0}
          className="w-full"
          onClick={onSubmitSale}
        >
          <CheckIcon size={20} />
          Finalizar venda
        </Button>
      </SheetFooter>
    </SheetContent>
  );
};

export default UpsertSheetContent;
