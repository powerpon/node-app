import express, { Request, Response } from 'express';
import { userCartService } from '../services/userCart.service';
import { CartGetResponseModel } from '../models/responses/CartGetResponseModel';
import { calculateTotal } from '../helpers/calcualteCartTotal';
import { CartDeleteResponseModel } from '../models/responses/CartDeleteResponseModel';
import { userOrderService } from '../services/userOrder.service';
import { OrderPostResponseModel } from '../models/responses/OrderPostResponseModel';
import { StatusCode } from '../enums/StatusCode';
import { cartUpdateRequestModel } from '../models/requests/CartUpdateRequestModel';
import { requestBodyValidate } from '../middlewares/requestBodyValidation';

const cartRouter = express.Router();

cartRouter.get('', (request: Request, response: Response) => {
    const cart = userCartService.getCartByUserId(request.get('x-user-id'));
    const cartResponseSuccess: CartGetResponseModel = {
        data: {
            cart: cart,
            total: calculateTotal(cart)
        },
        error: null
    }
    response.status(StatusCode.OK).send(cartResponseSuccess);
});

cartRouter.put('', requestBodyValidate(cartUpdateRequestModel), (request: Request, response: Response) => {
    const cart = userCartService.updateCartByUserId(request.get('x-user-id'), request.body);
    const cartResponseSuccess: CartGetResponseModel = {
        data: {
            cart: cart,
            total: calculateTotal(cart)
        },
        error: null
    }
    response.status(StatusCode.OK).send(cartResponseSuccess);
});

cartRouter.delete('', (request: Request, response: Response) => {
    userCartService.emptyCartByUserId(request.get('x-user-id'));
    const cartResponseSuccess: CartDeleteResponseModel = {
        data: {
            success: true
        },
        error: null
    }
    response.status(StatusCode.OK).send(cartResponseSuccess);
});

cartRouter.post('/checkout', (request: Request, response: Response) => {
    const order = userOrderService.createOrderByUserId(request.get('x-user-id'), request.body);
    const checkoutResponseSuccess: OrderPostResponseModel = {
        data: {
            order: order,
        },
        error: null
    }
    response.status(StatusCode.CREATED).send(checkoutResponseSuccess);
})

export {cartRouter};