import { Router } from "express";
import {
  addProduct,
  deleteProduct,
  getMaxProductPrice,
  getProducts,
  getProductsWithUsers,
  getTopExpensiveProducts,
  searchProduct,
  searchProductsByIds,
  softDeleteProduct,
} from "./products.service.js";

const productsRouter = Router();

productsRouter.post("/", addProduct);
productsRouter.patch("/soft-delete/:id", softDeleteProduct);
productsRouter.delete("/:id", deleteProduct);
productsRouter.get("/search", searchProduct);
productsRouter.get("/in", searchProductsByIds);
productsRouter.get("/", getProducts);
productsRouter.get("/products-with-users", getProductsWithUsers);
productsRouter.get("/max-price", getMaxProductPrice);
productsRouter.get("/top-expensive", getTopExpensiveProducts);

export default productsRouter;
