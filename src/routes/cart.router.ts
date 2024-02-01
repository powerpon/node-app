import express from 'express';
import { cartUpdateRequestModel } from '../models/requests/CartUpdateRequestModel';
import { requestBodyValidate } from '../middlewares/requestBodyValidation';
import { cartController } from '../controllers/cart.controller';
import { asyncHandler } from '../helpers/asyncHandler';
import { isAdmin } from '../middlewares/authorization';

const cartRouter = express.Router();

cartRouter.get('', asyncHandler(cartController.getCartByUserId));

cartRouter.put('', requestBodyValidate(cartUpdateRequestModel), asyncHandler(cartController.addProductToCartByUserId));

cartRouter.delete('', isAdmin, asyncHandler(cartController.emptyCartByUserId));

cartRouter.post('/checkout', asyncHandler(cartController.createOrderByUserId));

export default cartRouter;
