import { Request, Response } from 'express';
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct
} from '../service/product.service.js';
//get /product
export const getProducts = (res: Response) => {
  const products = getAllProducts();
  res.json({
    message: "Products retrieved",
    data: products
  });
};

//get /product/:id
export const getProduct = (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    return res.status(400).json({
      message: "Invalid product ID"
    });
  }

  const product = getProductById(id);

  if (!product) {
    return res.status(404).json({
      message: "Product not found"
    });
  }

  res.json({
    message: "Product retrieved",
    data: product
  });
};

//post /product
export const addProduct = (req: Request, res: Response) => {
  const productData = req.body;
  if (!productData.name || !productData.sku || !productData.description || !productData.price || !productData.quantity || !productData.categoryId) {
    return res.status(400).json({
      message: "Missing required product fields"
    });
  }

  const newProduct = createProduct(productData);
  res.status(201).json({
    message: "Product created",
    data: newProduct
  });
};

//patch /product/:id
export const updateProductContorller = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const productData = req.body;

  if (Number.isNaN(id)) {
    return res.status(400).json({
      message: "Invalid product ID"
    });
  }

  const updatedProduct = updateProduct(id, productData);

  if (!updatedProduct) {
    return res.status(404).json({
      message: "Product not found"
    });
  }

  res.json({
    message: "Product updated",
    data: updatedProduct
  });
};
//delete /product/:id
export const deleteProductController = (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    return res.status(400).json({
      message: "Invalid product ID"
    });
  }

  const deleted = deleteProduct(id);

  if (!deleted) {
    return res.status(404).json({
      message: "Product not found"
    });
  }

  res.json({
    message: "Product deleted"
  });
};
