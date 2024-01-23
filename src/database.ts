import { OrderStatus } from "./enums/OrderStatus";
import { UserRole } from "./enums/UserRole";
import { Cart } from "./models/entities/cart.model";
import { Order } from "./models/entities/order.model";
import { Product } from "./models/entities/product.model";
import { User } from "./models/entities/user.model";

export const database: {users: User[], carts: Cart[], orders: Order[], products: Product[]} = {
    users: [
        {
            id: "user123",
            cart: {
                id: "12345",
                userId: "user123",
                isDeleted: false,
                items: [
                    {
                        product: {
                            id: "1",
                            title: "Laptop",
                            description: "Powerful and portable computing device",
                            price: 999.99
                        },
                        count: 2
                    }, 
                    {
                        product: {
                            id: "3",
                            title: "Headphones",
                            description: "Over-ear, noise-canceling headphones for immersive audio",
                            price: 149.99
                        },
                        count: 1
                    }
                ]
            },
            orders: [],
            roles: [UserRole.USER],
            email: 'email@email.com',
            password: 'pass'
        }
    ],
    carts: [
        {
            id: "12345",
            userId: "user123",
            isDeleted: false,
            items: [{
                product: {
                    id: "1",
                    title: "Laptop",
                    description: "Powerful and portable computing device",
                    price: 999.99
                },
                count: 2
            }, {
                product: {
                    id: "3",
                    title: "Headphones",
                    description: "Over-ear, noise-canceling headphones for immersive audio",
                    price: 149.99
                },
                count: 1
            }]
        }
    ],
    orders: [
        {
            id: '123456',
            userId: "user123",
            cartId: "12345",
            items: [
                {
                    product: {
                        id: "1",
                        title: "Laptop",
                        description: "Powerful and portable computing device",
                        price: 999.99
                    },
                    count: 2
                }, {
                    product: {
                        id: "3",
                        title: "Headphones",
                        description: "Over-ear, noise-canceling headphones for immersive audio",
                        price: 149.99
                    },
                    count: 1
                }
            ],
            payment: {
              type: "Credit Card",
              address: "some street 123",
              creditCard: "1234567890123456",
            },
            delivery: {
              type: "Express",
              address: "some street 123",
            },
            comments: "Delivery instructions or additional comments",
            status: OrderStatus.CREATED,
            total: 1249.97,
          }
    ],
    products: [
        {
            id: "1",
            title: "Laptop",
            description: "Powerful and portable computing device",
            price: 999.99
        },
        {
            id: "2",
            title: "Smartphone",
            description: "High-performance mobile communication device",
            price: 599.99
        },
        {
            id: "3",
            title: "Headphones",
            description: "Over-ear, noise-canceling headphones for immersive audio",
            price: 149.99
        },
        {
            id: "81c9372c-b65d-4460-b4f2-865840ced161",
            title: "Coffee Maker",
            description: "Automatic drip coffee maker for your morning brew",
            price: 49.99
        },
        {
            id: "5",
            title: "Fitness Tracker",
            description: "Wearable device to monitor your health and activities",
            price: 79.99
        }
    ]
}