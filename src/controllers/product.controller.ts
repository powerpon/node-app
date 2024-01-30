import { Request, Response } from 'express';
import { StatusCode } from '../enums/StatusCode';
import { productService } from '../services/product.service';
import { ProductsGetResponseModel } from '../models/responses/ProductsGetResponseModel';
import { ProductGetResponseModel } from '../models/responses/ProductGetResponseModel';
import { AuthenticatedRequest } from '../models/requests/AuthenticatedRequestModel';

export const productController = {
    getAllProducts: async (request: AuthenticatedRequest, response: Response) => {
        const products = await productService.getAllProducts();
        const productsResponseSuccess: ProductsGetResponseModel = {
            data: products,
            error: null
        };
        response.status(StatusCode.OK).send(productsResponseSuccess);
    },
    getProductById: async (request: AuthenticatedRequest, response: Response) => {
        const product = await productService.getById(request.params.productId);
        const productResponseSuccess: ProductGetResponseModel = {
            data: product,
            error: null
        };
        response.status(StatusCode.OK).send(productResponseSuccess);
    }
};
