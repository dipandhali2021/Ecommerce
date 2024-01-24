import express from "express";
import {
  deleteProduct,
  getAdminProducts,
  getAllCategories,
  getAllProducts,
  getBestSellingProducts,
  getLatestProducts,
  getSingleProduct,
  newProduct,
  updateProduct,
} from "../controllers/product.js";
import { photosUpload } from "../middlewares/multer.js";
import { adminOnly } from "../middlewares/auth.js";

const app = express.Router();
///api/v1/products/new
app.post("/new", adminOnly, photosUpload, newProduct);
app.get("/all", getAllProducts);
app.get("/latest", getLatestProducts);
app.get("/best-selling",getBestSellingProducts)
app.get("/categories", getAllCategories);
app.get("/admin-products", adminOnly, getAdminProducts);

app
  .route("/:id")
  .get(getSingleProduct)
  .put(adminOnly, photosUpload, updateProduct)
  .delete(adminOnly, deleteProduct);

export default app;
