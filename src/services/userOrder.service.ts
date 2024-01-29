import { randomUUID } from "crypto";
import { EmptyCartError } from "../errors/EmptyCartError";
import { MissingUserError } from "../errors/MissingUserError";
import { IOrder } from "../models/entities/order.model";
import { userRepository } from "../repositories/user.repository";
import { CheckoutRequestModel } from "../models/requests/CheckoutRequestModel";
import { OrderStatus } from "../enums/OrderStatus";
import { calculateTotal } from "../helpers/calcualteCartTotal";
import { orderRepository } from "../repositories/order.repository";
import { MissingCartError } from "../errors/MissingCartError";

export const userOrderService = {
    createOrderByUserId: async (userId: string, orderDTO: CheckoutRequestModel) => {
        const user = await userRepository.getById(userId);
        if(user){
            if(user.cart === null){
                throw new MissingCartError();
            }
            if(user.cart.items.length === 0){
                throw new EmptyCartError();
            }
            const order: IOrder = {
                _id: randomUUID(),
                userId: userId,
                cartId: user.cart._id,
                items: user.cart.items,
                payment: orderDTO.payment,
                delivery: orderDTO.delivery,
                comments: orderDTO.comments,
                status: OrderStatus.CREATED,
                total: calculateTotal(user.cart)
            }
            return await orderRepository.create(order);
        }
        throw new MissingUserError();
    }
};
