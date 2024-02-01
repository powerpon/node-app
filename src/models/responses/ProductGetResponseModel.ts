import { IProduct } from "../entities/product.model";

export interface ProductGetResponseModel {
    data: IProduct;
    error: null
}
