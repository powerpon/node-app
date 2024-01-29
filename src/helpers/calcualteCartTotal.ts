import { Cart, CartItem } from "../models/entities/cart.model";

export function calculateTotal(cart: Cart): number {
    return cart.items.reduce((sum: number, item: CartItem) => sum + (item.product.price * item.count), 0);
}
