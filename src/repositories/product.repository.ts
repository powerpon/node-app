import { IProduct, Product } from "../models/entities/product.model";
import { BaseRepository } from "./base.repository";

export const productRepository = new BaseRepository<IProduct, string>(Product);
