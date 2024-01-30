import { Schema, model } from "mongoose";
import { IProduct, Product, productSchema } from "./product.model";
import { UUID, randomUUID } from "crypto";

export interface CartItem {
    product: IProduct;
    count: number;
}

export const cartItemSchema = new Schema({
    product: {type: productSchema, required: true},
    count: {type: Number, required: true}
});

export interface ICart{
    _id?: string;
    userId: string;
    isDeleted: boolean;
    items: CartItem[];
}

export const cartSchema = new Schema<ICart>({
    _id: {type: String, default: () => randomUUID()},
    userId: {type: String, required: true},
    isDeleted: {type: Boolean, required: true},
    items: {type: [cartItemSchema], required: true},
});

export const Cart = model<ICart>('Cart', cartSchema);
