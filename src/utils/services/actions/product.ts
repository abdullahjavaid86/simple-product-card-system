import { Products } from "../../../interfaces/product";
import { ProductsEndPoints } from "../end-points";
import { apiInstance } from "..";

export const fetchProductsApi = (signal?: AbortSignal) =>
  apiInstance.get<Products>(ProductsEndPoints.FetchProductsEndPoint, {
    signal,
  });
