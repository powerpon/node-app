import express from 'express';
import { cartUpdateRequestModel } from '../models/requests/CartUpdateRequestModel';
import { requestBodyValidate } from '../middlewares/requestBodyValidation';
import { cartController } from '../controllers/cart.controller';

const cartRouter = express.Router();

cartRouter.get('', cartController.getCartByUserId);

cartRouter.put('', requestBodyValidate(cartUpdateRequestModel), cartController.addProductToCartByUserId);

cartRouter.delete('', cartController.emptyCartByUserId);

cartRouter.post('/checkout', cartController.createOrderByUserId)

export default cartRouter;
