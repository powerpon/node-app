import { database } from "../database";
import { Product } from "../models/entities/product.model";

export const productRepository = {
    create: (product: Product): Product => {
        database.products.push(product);
        return product;
    },
    getById: (id: string): Product => {
        return database.products.find((product: Product) => product.id === id);
    },
    update: (id: string, newProduct: Product): Product => {
        const oldProductIdx = database.products.findIndex((product: Product) => product.id === id);
        if(oldProductIdx !== -1){
            database.products[oldProductIdx] = newProduct;
            return newProduct;
        }
    },
    delete: (id: string): void => {
        database.products = database.products.filter((product: Product) => product.id !== id);
    },
    getAll: (): Product[] => {
        return database.products;
    }
}