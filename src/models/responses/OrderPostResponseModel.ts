import { Order } from "../entities/order.model";

export interface OrderPostResponseModel {
    data: {
        order: Order;
    };
    error: null
}
