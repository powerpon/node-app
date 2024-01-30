import { Schema, model } from "mongoose";
import { UserRole } from "../../enums/UserRole";
import { ICart, cartSchema } from "./cart.model";
import { IOrder, orderSchema } from "./order.model";
import { randomUUID } from "crypto";

export interface IUser {
    _id?: string;
    cart?: ICart | null;
    orders?: IOrder[];
    role: UserRole;
    email: string;
    password: string;
}

const userSchema = new Schema({
    _id: {type: String, default: () => randomUUID()},
    cart: {type: cartSchema, default: null},
    orders: [{type: orderSchema, default: []}],
    role: {type: String, enum: UserRole, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true}
});

export const User = model<IUser>('User', userSchema);
