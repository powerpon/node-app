import { Product } from "../entities/product.model";

export interface ProductsGetResponseModel {
    data: Product[];
    error: null
}
