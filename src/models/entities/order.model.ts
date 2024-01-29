import { OrderStatus } from "../../enums/OrderStatus";
import { CartItem } from "./cart.model";

export interface Order {
    id: string,
    userId: string;
    cartId: string;
    items: CartItem[]
    payment: {
      type: string,
      address?: any,
      creditCard?: any,
    },
    delivery: {
      type: string,
      address: any,
    },
    comments: string,
    status: OrderStatus;
    total: number;
}
