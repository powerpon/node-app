import { randomUUID } from "crypto";
import { Cart } from "../models/entities/cart.model";

export function generateEmptyCart(userId: string): Cart {
    return {
        id: randomUUID(),
        userId: userId,
        isDeleted: false,
        items: []
    }
}
