import { database } from "../database";
import { Product } from "../models/entities/product.model";
import { BaseRepository } from "./base.repository";

export const productRepository = new BaseRepository<Product, string>(database.products);
