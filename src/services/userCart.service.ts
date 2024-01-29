import { MissingCartError } from "../errors/MissingCartError";
import { MissingProductError } from "../errors/MissingProductError";
import { MissingUserError } from "../errors/MissingUserError";
import { generateEmptyCart } from "../helpers/generateEmptyCart";
import { ICart, CartItem } from "../models/entities/cart.model";
import { CartUpdateRequestModel } from "../models/requests/CartUpdateRequestModel";
import cartRepository from "../repositories/cart.repository";
import { productRepository } from "../repositories/product.repository";
import { userRepository } from "../repositories/user.repository";

export const userCartService = {
    getCartByUserId: async (userId: string) => {
        const user = await userRepository.getById(userId);
        if(user){
            if(user.cart === null){
                const emptyCart = generateEmptyCart(userId);
                await cartRepository.create(emptyCart);
                user.cart = emptyCart;
                await userRepository.update(userId, user);
                return emptyCart;
            }
            return user.cart;
        }
        throw new MissingUserError();
    },
    updateCartByUserId: async (userId: string, cartDTO: CartUpdateRequestModel) => {
        const user = await userRepository.getById(userId);
        if(user){
            if(user.cart === null){
                throw new MissingCartError();
            }
            const product = await productRepository.getById(cartDTO.productId);
            if(!product){
                throw new MissingProductError();
            }
            const cartItem: CartItem = {
                product: product,
                count: cartDTO.count
            }
            user.cart.items.push(cartItem);
            await cartRepository.update(user.cart._id, user.cart);
            await userRepository.update(userId, user);
            return user.cart;
        }
        throw new MissingUserError();
    },
    emptyCartByUserId: async (userId: string) => {
        const user = await userRepository.getById(userId);
        if(user){
            if(user.cart !== null) {
                await cartRepository.delete(user.cart._id);
            }
            const emptyCart = generateEmptyCart(userId);
            await cartRepository.create(emptyCart);
            user.cart = emptyCart;
            await userRepository.update(userId, user);
            return;
        }
        throw new MissingUserError();
    }
};
