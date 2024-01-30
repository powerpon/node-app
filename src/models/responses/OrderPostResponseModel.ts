import { IOrder } from "../entities/order.model";

export interface OrderPostResponseModel {
    data: {
        order: IOrder;
    };
    error: null
}
