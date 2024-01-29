import { Schema, model } from "mongoose";
import { UserRole } from "../../enums/UserRole";
import { Cart, ICart, cartSchema } from "./cart.model";
import { IOrder, Order, orderSchema } from "./order.model";
import { randomUUID } from "crypto";

export interface IUser {
    _id: string;
    cart: ICart | null;
    orders: IOrder[];
    roles: UserRole[];
    email: string;
    password: string;
}

const userSchema = new Schema({
    _id: {type: String, default: () => randomUUID()},
    cart: {type: cartSchema, default: null},
    orders: [{type: orderSchema, required: true}],
    roles: [{type: String, enum: UserRole, required: true},],
    email: {type: String, required: true},
    password: {type: String, required: true}
});

export const User = model<IUser>('User', userSchema);
