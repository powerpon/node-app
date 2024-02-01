import { IOrder, Order } from "../models/entities/order.model";
import { BaseRepository } from "./base.repository";

export const orderRepository = new BaseRepository<IOrder, string>(Order);
