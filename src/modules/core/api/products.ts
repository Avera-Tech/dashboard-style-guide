import { Produto } from "../types/product";
import conectAPI from "@/utils/conectAPI";
import ProductsRepository from "./productsRepository";

export default class ProductsCollection implements ProductsRepository {
    async list(): Promise<{products: Produto[]}> {
        return conectAPI("/products", "GET");
    }

    async getById(id: string): Promise<Produto> {
        return conectAPI(`/products/${id}`, "GET");
    }

    async create(produto: Produto): Promise<Produto> {
        return conectAPI("/products", "POST", produto);
    }

    async update(id: string, produto: Produto): Promise<Produto> {
        return conectAPI(`/products/${id}`, "PUT", produto);
    }

    async delete(id: string): Promise<void> {
        return conectAPI(`/products/${id}`, "DELETE");
    }
}