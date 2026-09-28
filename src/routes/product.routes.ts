
import { Router } from "express";

const productRoutes = Router();

interface Product {
    id: number;
    name: string;
    sku: string;
    description: string;
    price: number;
    quantity: number;
    categoryId: number;
}

interface CreateProduct {
    name: string;
    sku: string;
    description: string;
    price: number;
    quantity: number;
    categoryId: number;
}

const products = new Map<number, Product>();

let nextId = 1;


// GET ALL PRODUCTS
productRoutes.get("/", (req, res) => {
    res.json([...products.values()]);
});


// GET PRODUCT BY ID
productRoutes.get("/:id", (req, res) => {

    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
        return res.status(400).json({
            message: "Invalid product ID"
        });
    }

    const product = products.get(id);

    if (!product) {
        return res.status(404).json({
            message: "Product not found"
        });
    }

    res.json(product);
});


// CREATE PRODUCT
productRoutes.post("/", (req, res) => {

    const data: CreateProduct = req.body;

    // Validation
    if (
        typeof data.name !== "string" ||
        typeof data.sku !== "string" ||
        typeof data.description !== "string" ||
        typeof data.price !== "number" ||
        typeof data.quantity !== "number" ||
        typeof data.categoryId !== "number"
    ) {
        return res.status(400).json({
            message: "Invalid product data"
        });
    }

    // Generate ID on the server
    const product: Product = {
        id: nextId++,
        ...data
    };

    products.set(product.id, product);

    res.status(201).json({
        message: "Product created",
        data: product
    });
});


// PATCH PRODUCT
productRoutes.patch("/:id", (req, res) => {

    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
        return res.status(400).json({
            message: "Invalid product ID"
        });
    }

    const product = products.get(id);

    if (!product) {
        return res.status(404).json({
            message: "Product not found"
        });
    }

    const updatedProduct: Product = {
        ...product,
        ...req.body,
        id: product.id
    };

    products.set(id, updatedProduct);

    res.json({
        message: "Product updated",
        data: updatedProduct
    });
});


// DELETE PRODUCT
productRoutes.delete("/:id", (req, res) => {

    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
        return res.status(400).json({
            message: "Invalid product ID"
        });
    }

    const product = products.get(id);

    if (!product) {
        return res.status(404).json({
            message: "Product not found"
        });
    }

    products.delete(id);

    res.status(200).json({
        message: "Product deleted"
    });
});


export default productRoutes;

