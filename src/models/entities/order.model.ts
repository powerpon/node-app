import { Schema, model } from "mongoose";
import { OrderStatus } from "../../enums/OrderStatus";
import { CartItem, cartItemSchema } from "./cart.model";
import { randomUUID } from "crypto";

export interface Payment {
  type: string;
  address?: any;
  creditCard?: any;
}

const paymentSchema = new Schema({
  type: {type: String, required: true},
  address: {},
  creditCard: {}
});

export interface Delivery {
  type: string;
  address: any;
}

const deliverySchema = new Schema({
  type: {type: String, required: true},
  address: {type: {}, required: true},
});

export interface IOrder {
  _id: string;
  userId: string;
  cartId: string;
  items: CartItem[];
  payment: Payment;
  delivery: Delivery;
  comments: string;
  status: OrderStatus;
  total: number;
}

export const orderSchema = new Schema<IOrder>({
  _id: {type: String, default: () => randomUUID()},
  userId: {type: String, required: true},
  cartId: {type: String, required: true},
  items: {type: [cartItemSchema], required: true},
  payment: {type: paymentSchema, required: true},
  delivery: {type: deliverySchema, required: true},
  comments: {type: String, required: true},
  status: {type: String, enum: OrderStatus, required: true},
  total: {type: Number, required: true}
});

export const Order = model<IOrder>('Order', orderSchema);
