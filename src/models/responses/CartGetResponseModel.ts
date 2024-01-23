import { Cart } from "../entities/cart.model"

export interface CartGetResponseModel {
    data: {
        cart: Cart;
        total: number;
    };
    error: null
}