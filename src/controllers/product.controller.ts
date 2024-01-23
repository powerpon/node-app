import express, { Request, Response } from 'express';
import { StatusCode } from '../enums/StatusCode';
import { productService } from '../services/product.service';
import { ProductsGetResponseModel } from '../models/responses/ProductsGetResponseModel';
import { ProductGetResponseModel } from '../models/responses/ProductGetResponseModel';

const productRouter = express.Router();

productRouter.get('', (request: Request, response: Response) => {
    const products = productService.getAllProducts();
    const productsResponseSuccess: ProductsGetResponseModel = {
        data: products,
        error: null
    };
    response.status(StatusCode.OK).send(productsResponseSuccess);
})

productRouter.get('/:productId', (request: Request, response: Response) => {
    const product = productService.getById(request.params.productId);
    const productResponseSuccess: ProductGetResponseModel = {
        data: product,
        error: null
    };
    response.status(StatusCode.OK).send(productResponseSuccess);
})

export {productRouter};