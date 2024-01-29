import { randomUUID } from "crypto";
import { EmptyCartError } from "../errors/EmptyCartError";
import { MissingUserError } from "../errors/MissingUserError";
import { Order } from "../models/entities/order.model";
import { userRepository } from "../repositories/user.repository";
import { CheckoutRequestModel } from "../models/requests/CheckoutRequestModel";
import { OrderStatus } from "../enums/OrderStatus";
import { calculateTotal } from "../helpers/calcualteCartTotal";
import { orderRepository } from "../repositories/order.repository";
import { MissingCartError } from "../errors/MissingCartError";

export const userOrderService = {
    createOrderByUserId: (userId: string, orderDTO: CheckoutRequestModel): Order => {
        const user = userRepository.getById(userId);
        if(user){
            if(user.cart === null){
                throw new MissingCartError();
            }
            if(user.cart.items.length === 0){
                throw new EmptyCartError();
            }
            const order: Order = {
                id: randomUUID(),
                userId: userId,
                cartId: user.cart.id,
                items: user.cart.items,
                payment: orderDTO.payment,
                delivery: orderDTO.delivery,
                comments: orderDTO.comments,
                status: OrderStatus.CREATED,
                total: calculateTotal(user.cart)
            }
            return orderRepository.create(order);
        }
        throw new MissingUserError();
    }
};
