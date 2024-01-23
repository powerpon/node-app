import { database } from "../database"
import { Order } from "../models/entities/order.model";

export const orderRepository = {
    create: (order: Order): Order => {
        database.orders.push(order);
        return order;
    },
    getById: (id: string): Order => {
        return database.orders.find((order: Order) => order.id === id);
    },
    update: (id: string, newOrder: Order): Order => {
        const oldOrderIdx = database.orders.findIndex((order: Order) => order.id === id);
        if(oldOrderIdx !== -1){
            database.orders[oldOrderIdx] = newOrder;
            return newOrder;
        }
    },
    delete: (id: string): void => {
        database.orders = database.orders.filter((order: Order) => order.id !== id);
    },
    getAll: (): Order[] => {
        return database.orders;
    }
}