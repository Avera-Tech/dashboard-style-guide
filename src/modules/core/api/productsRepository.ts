import { Produto } from "../types/product";

export default interface ProductsRepository {
    list(): Promise<{products: Produto[]}>;
    getById(id: string): Promise<Produto>;
    create(produto: Produto): Promise<Produto>;
    update(id: string, produto: Produto): Promise<Produto>;
    delete(id: string): Promise<void>;
}