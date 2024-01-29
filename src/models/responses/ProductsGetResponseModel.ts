import { IProduct } from "../entities/product.model";

export interface ProductsGetResponseModel {
    data: IProduct[];
    error: null
}
