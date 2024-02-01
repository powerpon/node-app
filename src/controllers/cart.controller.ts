import { Response } from 'express';
import { userCartService } from '../services/userCart.service';
import { CartGetResponseModel } from '../models/responses/CartGetResponseModel';
import { calculateTotal } from '../helpers/calcualteCartTotal';
import { CartDeleteResponseModel } from '../models/responses/CartDeleteResponseModel';
import { userOrderService } from '../services/userOrder.service';
import { OrderPostResponseModel } from '../models/responses/OrderPostResponseModel';
import { StatusCode } from '../enums/StatusCode';
import { AuthenticatedRequest } from '../models/requests/AuthenticatedRequestModel';

export const cartController = {
    getCartByUserId: async (request: AuthenticatedRequest, response: Response) => {
        const cart = await userCartService.getCartByUserId(request.user._id);
        const cartResponseSuccess: CartGetResponseModel = {
            data: {
                cart: cart,
                total: calculateTotal(cart)
            },
            error: null
        }
        response.status(StatusCode.OK).send(cartResponseSuccess);
    },
    addProductToCartByUserId: async (request: AuthenticatedRequest, response: Response) => {
        const cart = await userCartService.updateCartByUserId(request.user._id, request.body);
        const cartResponseSuccess: CartGetResponseModel = {
            data: {
                cart: cart,
                total: calculateTotal(cart)
            },
            error: null
        }
        response.status(StatusCode.OK).send(cartResponseSuccess);
    },
    emptyCartByUserId: async (request: AuthenticatedRequest, response: Response) => {
        await userCartService.emptyCartByUserId(request.user._id);
        const cartResponseSuccess: CartDeleteResponseModel = {
            data: {
                success: true
            },
            error: null
        }
        response.status(StatusCode.OK).send(cartResponseSuccess);
    },
    createOrderByUserId: async (request: AuthenticatedRequest, response: Response) => {
        const order = await userOrderService.createOrderByUserId(request.user._id, request.body);
        const checkoutResponseSuccess: OrderPostResponseModel = {
            data: {
                order: order,
            },
            error: null
        }
        response.status(StatusCode.CREATED).send(checkoutResponseSuccess);
    }
};
