import { UserRole } from "../../enums/UserRole";
import { Cart } from "./cart.model";
import { Order } from "./order.model";

export interface User {
    id: string;
    cart: Cart | null;
    orders: Order[];
    roles: UserRole[];
    email: string;
    password: string;
}
