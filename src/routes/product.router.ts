import express from 'express';
import { productController } from '../controllers/product.controller';
import { asyncHandler } from '../helpers/asyncHandler';

const productRouter = express.Router();

productRouter.get('', asyncHandler(productController.getAllProducts));

productRouter.get('/:productId', asyncHandler(productController.getProductById));

export default productRouter;
