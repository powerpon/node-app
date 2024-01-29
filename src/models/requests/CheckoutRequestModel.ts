interface Payment {
    type: string,
    address?: any,
    creditCard?: any,
}

interface Delivery {
    type: string,
    address: any,
}

export interface CheckoutRequestModel {
    payment: Payment;
    delivery: Delivery;
    comments: string;
}
