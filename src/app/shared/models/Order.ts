import { Product } from "./Product";

export interface Order {
    datePlaced: Date;
    email: string;
    products: Product[];
}