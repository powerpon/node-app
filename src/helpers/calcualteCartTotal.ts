import { ICart, CartItem } from "../models/entities/cart.model";

export function calculateTotal(cart: ICart): number {
    return cart.items.reduce((sum: number, item: CartItem) => sum + (item.product.price * item.count), 0);
}
