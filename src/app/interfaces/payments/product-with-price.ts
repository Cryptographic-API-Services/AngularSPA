import { Price } from "./price";
import { Product } from "./product";

export class ProductWithPrice {
    public product: Product;
    public prices: Array<Price>;
    public isAssignedToMe: boolean;
}