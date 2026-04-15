import conectAPI from "@/utils/conectAPI";
import type { ProductType } from "../types/product";

export async function getProductTypesDropdown(): Promise<ProductType[]> {
  const res = await conectAPI("/product-types/dropdown", "GET");
  return res.productTypes ?? [];
}
