import { database } from "../database";
import { Cart } from "../models/entities/cart.model";

export const cartRepository = {
    create: (cart: Cart): Cart => {
        database.carts.push(cart);
        return cart;
    },
    getById: (id: string): Cart => {
        return database.carts.find((cart: Cart) => cart.id === id && !cart.isDeleted);
    },
    update: (id: string, newCart: Cart): Cart => {
        const oldCartIdx = database.carts.findIndex((cart: Cart) => cart.id === id && !cart.isDeleted);
        if(oldCartIdx !== -1){
            database.carts[oldCartIdx] = newCart;
            return newCart;
        }
    },
    delete: (id: string): void => {
        const cart = database.carts.find((cart) => cart.id === id);
        cart.isDeleted = true;
    },
    getAll: (): Cart[] => {
        return database.carts.filter((cart) => !cart.isDeleted);
    }
}