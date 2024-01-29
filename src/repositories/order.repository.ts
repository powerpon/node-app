import { database } from "../database"
import { Order } from "../models/entities/order.model";
import { BaseRepository } from "./base.repository";

export const orderRepository = new BaseRepository<Order, string>(database.orders);
