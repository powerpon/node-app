import { randomUUID } from "crypto";
import { Schema, model } from "mongoose";

export interface IProduct {
    _id: string;
    title: string;
    description: string;
    price: number;
}

export const productSchema = new Schema<IProduct>({
    _id: {type: String, default: () => randomUUID()},
    title: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
});

export const Product = model<IProduct>('Product', productSchema);
