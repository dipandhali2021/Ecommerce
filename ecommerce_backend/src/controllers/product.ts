import { Request, Response, NextFunction } from "express";
import { tryCatch } from "../middlewares/error.js";
import { NewProductRequstBody } from "../types/types.js";
import { Product } from "../models/product.js";
import ErrorHandler from "../utils/utility-class.js";
import { rm } from "fs";

export const newProduct = tryCatch(
  async (
    req: Request<{}, {}, NewProductRequstBody>,
    res: Response,
    next: NextFunction
  ) => {
    const { name, category, price, stock } = req.body;
    const photo = req.file;
    if (!photo) return next(new ErrorHandler("Please provide a photo", 400));
    if (!name || !category || !price || !stock) {
      rm(photo.path, () => {
        console.log("Photo deleted");
      });
      return next(
        new ErrorHandler("Please provide all the required fields", 400)
      );
    }

    await Product.create({
      name,
      price,
      stock,
      category: category.toLowerCase(),
      photo: photo?.path,
    });
    return res.status(201).json({
      status: true,
      message: "Product created successfully",
    });
  }
);

export const getLatestProducts = tryCatch(async (req, res, next) => {
  const products = await Product.find({}).sort({ createdAt: -1 }).limit(1);
  return res.status(200).json({
    status: "success",
    products,
  });
});
export const getAllCategories = tryCatch(async (req, res, next) => {
  const categories = await Product.find({}).distinct("category");
  return res.status(200).json({
    status: "success",
    categories,
  });
});
