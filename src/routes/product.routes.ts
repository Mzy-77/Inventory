import {Router} from "express";
import {
    getProducts,
    getProduct,
    addProduct,
    updateProductContorller,
    deleteProductController
} from "../controller/product.controller.js";

const productRouter = Router();

productRouter.get("/", getProducts);
productRouter.get("/:id", getProduct);
productRouter.post("/", addProduct);
productRouter.patch("/:id", updateProductContorller);
productRouter.delete("/:id", deleteProductController);

export default productRouter;