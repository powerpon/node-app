import { Cart, ICart } from "../models/entities/cart.model";
import { BaseRepository } from "./base.repository";

const cartRepository = new BaseRepository<ICart, string>(Cart);

cartRepository.getById = async (id: string) => {
    return await Cart.findOne({_id: id, isDeleted: false}).exec();
}

cartRepository.update = async (id: string, newCart: ICart) => {
    return await Cart.replaceOne({_id: id, isDeleted: false}, newCart).exec();
}

cartRepository.delete = async (id: string) => {
    await Cart.updateOne({_id: id}, {isDeleted: true});
}

cartRepository.getAll = async () => {
    return await Cart.find({});
}

export default cartRepository;
