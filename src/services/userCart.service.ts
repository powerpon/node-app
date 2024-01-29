import { MissingCartError } from "../errors/MissingCartError";
import { MissingProductError } from "../errors/MissingProductError";
import { MissingUserError } from "../errors/MissingUserError";
import { generateEmptyCart } from "../helpers/generateEmptyCart";
import { Cart, CartItem } from "../models/entities/cart.model";
import { CartUpdateRequestModel } from "../models/requests/CartUpdateRequestModel";
import cartRepository from "../repositories/cart.repository";
import { productRepository } from "../repositories/product.repository";
import { userRepository } from "../repositories/user.repository";

export const userCartService = {
    getCartByUserId: (userId: string): Cart => {
        const user = userRepository.getById(userId);
        if(user){
            if(user.cart === null){
                const emptyCart = generateEmptyCart(userId);
                cartRepository.create(emptyCart);
                user.cart = emptyCart;
                userRepository.update(userId, user);
                return emptyCart;
            }
            return user.cart;
        }
        throw new MissingUserError();
    },
    updateCartByUserId: (userId: string, cartDTO: CartUpdateRequestModel): Cart => {
        const user = userRepository.getById(userId);
        if(user){
            if(user.cart === null){
                throw new MissingCartError();
            }
            const product = productRepository.getById(cartDTO.productId);
            if(!product){
                throw new MissingProductError();
            }
            const cartItem: CartItem = {
                product: product,
                count: cartDTO.count
            }
            user.cart.items.push(cartItem);
            cartRepository.update(user.cart.id, user.cart);
            userRepository.update(userId, user);
            return user.cart;
        }
        throw new MissingUserError();
    },
    emptyCartByUserId: (userId: string): void => {
        const user = userRepository.getById(userId);
        if(user){
            if(user.cart !== null) {
                cartRepository.delete(user.cart.id);
            }
            const emptyCart = generateEmptyCart(userId);
            cartRepository.create(emptyCart);
            user.cart = emptyCart;
            userRepository.update(userId, user);
            return;
        }
        throw new MissingUserError();
    }
};
