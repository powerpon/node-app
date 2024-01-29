import { randomUUID } from "crypto";
import { ICart } from "../models/entities/cart.model";

export function generateEmptyCart(userId: string) {
    return {
        _id: randomUUID(),
        userId: userId,
        isDeleted: false,
        items: []
    }
}
