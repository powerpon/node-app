import { MissingProductError } from "../errors/MissingProductError";
import { productRepository } from "../repositories/product.repository";

export const productService = {
    getAllProducts: async () => {
        return await productRepository.getAll();
    },
    getById: async (id: string) => {
        const product = await productRepository.getById(id);
        if(product) {
            return product;
        }
        throw new MissingProductError();
    }
};
