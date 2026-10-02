export interface Product {
    id: number;
    name: string;
    sku: string;
    description: string;
    price: number;
    quantity: number;
    categoryId: number;
}

export interface CreateProduct {
    name: string;
    sku: string;
    description: string;
    price: number;
    quantity: number;
    categoryId: number;
}
