import { database } from "../database";
import { Cart } from "../models/entities/cart.model";
import { BaseRepository } from "./base.repository";

const cartRepository = new BaseRepository<Cart, string>(database.carts);

cartRepository.getById = (id: string): Cart => {
    return database.carts.find((cart: Cart) => cart.id === id && !cart.isDeleted);
}

cartRepository.update = (id: string, newCart: Cart): Cart => {
    const oldCartIdx = database.carts.findIndex((cart: Cart) => cart.id === id && !cart.isDeleted);
    if(oldCartIdx !== -1){
        database.carts[oldCartIdx] = newCart;
        return newCart;
    }
}

cartRepository.delete = (id: string): void => {
    const cart = database.carts.find((cart) => cart.id === id);
    cart.isDeleted = true;
}

cartRepository.getAll = (): Cart[] => {
    return database.carts.filter((cart) => !cart.isDeleted);
}

export default cartRepository;
