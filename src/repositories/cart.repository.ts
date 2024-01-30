import { Cart, ICart } from "../models/entities/cart.model";
import { BaseRepository } from "./base.repository";

class CartRepository extends BaseRepository<ICart, string> {
    constructor() {
        super(Cart);
    }

    async getById(id: string) {
        return await Cart.findOne({_id: id, isDeleted: false}).exec();
    }
    
    async update(id: string, newCart: ICart) {
        return await Cart.replaceOne({_id: id, isDeleted: false}, newCart).exec();
    }
    
    async delete(id: string) {
        await Cart.updateOne({_id: id}, {isDeleted: true});
    }
    
    async getAll() {
        return await Cart.find({});
    }
}

export const cartRepository = new CartRepository();
