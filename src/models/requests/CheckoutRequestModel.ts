import { Payment, Delivery } from "../entities/order.model";

export interface CheckoutRequestModel {
    payment: Payment;
    delivery: Delivery;
    comments: string;
}
