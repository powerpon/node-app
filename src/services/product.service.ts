import { MissingProductError } from "../errors/MissingProductError";
import { Product } from "../models/entities/product.model";
import { productRepository } from "../repositories/product.repository";

export const productService = {
    getAllProducts: (): Product[] => {
        return productRepository.getAll();
    },
    getById: (id: string): Product => {
        const product = productRepository.getById(id);
        if(product) {
            return product;
        }
        throw new MissingProductError();
    }
};
