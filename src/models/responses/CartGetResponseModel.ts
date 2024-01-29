import { ICart } from "../entities/cart.model"

export interface CartGetResponseModel {
    data: {
        cart: ICart;
        total: number;
    };
    error: null
}
