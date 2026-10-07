import {Product, CreateProduct} from '../types/product.type.js';
import {getTotalProducts} from "../controller/product.controller.js";
const products: Map<number, Product> = new Map();

let nextId = 1;


function getAllProducts() {
    return [...products.values()];
}

function getProductById(id: number) {
    return products.get(id);
}

function createProduct(productData: CreateProduct) {
    const newProduct: Product = {
        id: nextId++,
        ...productData
    };
    products.set(newProduct.id, newProduct);
    return newProduct;
}


export const updateProduct = (
    id: number,
    data: Partial<CreateProduct>
): Product | undefined => {
    const product = products.get(id);
    if (!product) {
        return undefined;
    }

    const updatedProduct: Product = {
        ...product,
        ...data
    };

    products.set(id, updatedProduct);
    return updatedProduct;
};


export const deleteProduct = (id: number): boolean => {
    return products.delete(id);
};

export  function  GetTotalProducts ()  {
    let total = 0;
     products.forEach((product: Product) => {
        total +=1
    })
    return total
}
export { getAllProducts, getProductById, createProduct };