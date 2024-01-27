import { Request, Response, NextFunction } from "express";
import { tryCatch } from "../middlewares/error.js";
import {
  NewProductRequstBody,
  SearchRequestQuery,
  baseQueryType,
} from "../types/types.js";
import { Product } from "../models/product.js";
import ErrorHandler from "../utils/utility-class.js";
import { rm } from "fs";
import { myCache } from "../app.js";
import { invalidateCache } from "../utils/features.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

export const getLatestProducts = tryCatch(async (req, res, next) => {
  let products;
  if (myCache.has("latest-product")) {
    products = JSON.parse(myCache.get("latest-product") as string);
  } else {
    products = await Product.find({}).sort({ createdAt: -1 }).limit(5);
    myCache.set("latest-product", JSON.stringify(products));
  }
  invalidateCache({ product: true, admin: true });
  return res.status(200).json({
    status: "success",
    products,
  });
});

export const getBestSellingProducts = tryCatch(async (req, res, next) => {
  let products;

  products = await Product.find({ sold: { $gt: 0 } })
    .sort({ sold: -1 })
    .limit(5);
  return res.status(200).json({
    status: "success",
    products,
  });
});

//revalidate on new update or delete product and new order

export const getAllCategories = tryCatch(async (req, res, next) => {
  let categories;
  if (myCache.has("categories")) {
    categories = JSON.parse(myCache.get("categories") as string);
  } else {
    categories = await Product.find({}).distinct("category");
    myCache.set("categories", JSON.stringify(categories));
  }

  return res.status(200).json({
    status: "success",
    categories,
  });
});

//revalidate on new update or delete product and new order
export const getAdminProducts = tryCatch(async (req, res, next) => {
  let products;
  if (myCache.has("all-products")) {
    products = JSON.parse(myCache.get("all-products") as string);
  } else {
    products = await Product.find({});
    myCache.set("all-products", JSON.stringify(products));
  }

  return res.status(200).json({
    status: "success",
    products,
  });
});
export const getSingleProduct = tryCatch(async (req, res, next) => {
  let product;
  const id = req.params.id;
  if (myCache.has(`product-${id}`)) {
    product = JSON.parse(myCache.get(`product-${id}`) as string);
  } else {
    product = await Product.findById(id);
    if (!product) return next(new ErrorHandler("Product not found", 404));
    myCache.set(`product-${id}`, JSON.stringify(product));
  }

  return res.status(200).json({
    status: "success",
    product,
  });
});

export const newProduct = tryCatch(
  async (
    req: Request<{}, {}, NewProductRequstBody>,
    res: Response,
    next: NextFunction
  ) => {
    const { name, category, price, stock, description } = req.body;
    const photos = req.files;
    if (!photos || photos.length === 0)
      return next(new ErrorHandler("Please provide at least one photo", 400));
    if (!name || !category || !price || !stock || !description) {
      if (Array.isArray(photos)) {
        photos.forEach((photo) => {
          rm(photo.path, () => {
            console.log("Photo deleted");
          });
        });
      }

      return next(
        new ErrorHandler("Please provide all the required fields", 400)
      );
    }

    const photoPaths = await Promise.all(
      (photos as Express.Multer.File[]).map(async (photo) => {
        const response = await uploadOnCloudinary(photo.path,"products");
        return response?.secure_url;
      })
    );

    await Product.create({
      name,
      price,
      stock,
      description,
      category: category.toLowerCase(),
      photo: photoPaths,
    });

    invalidateCache({ product: true, admin: true });
    return res.status(201).json({
      status: true,
      message: "Product created successfully",
    });
  }
);

export const updateProduct = tryCatch(async (req, res, next) => {
  const { name, price, stock, category, description } = req.body;
  const product = await Product.findById(req.params.id);
  if (!product) return next(new ErrorHandler("Product not found", 404));

  if (req.files) {
    // Delete old photos
    product.photo.forEach((photo) => {
      rm(photo, (err) => {
        if (err) {
          console.error(`Failed to delete photo ${photo}: ${err}`);
        } else {
          console.log(`Product photo ${photo} deleted`);
        }
      });
    });


    

    // Add new photos
    const photos = (await Promise.all((req.files as Express.Multer.File[]).map(
      async (file) => {
        const response = await uploadOnCloudinary(file.path,"products");
        return response?.secure_url;
      }
    ))).filter((photo) => photo !== undefined); 

    product.photo = photos as string[];
  }

  if (name) product.name = name;
  if (price) product.price = price;
  if (category) product.category = category;
  if (stock) product.stock = stock;
  if (description) product.description = description;

  await product.save();
  invalidateCache({
    product: true,
    admin: true,
    productId: String(product._id),
  });
  return res.status(200).json({
    status: true,
    message: "Product Updated successfully",
  });
});

export const deleteProduct = tryCatch(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) return next(new ErrorHandler("Product not found", 404));
  product.photo.forEach((photo) => {
    rm(photo, (err) => {
      if (err) {
        console.error(`Failed to delete photo ${photo}: ${err}`);
      } else {
        console.log(`Product photo ${photo} deleted`);
      }
    });
  });
  await product.deleteOne();
  invalidateCache({
    product: true,
    admin: true,
    productId: String(product._id),
  });
  return res.status(200).json({
    status: "success",
    message: "Product deleted successfully",
    product,
  });
});

export const getAllProducts = tryCatch(
  async (req: Request<{}, {}, {}, SearchRequestQuery>, res, next) => {
    const { search, price, category, sort } = req.query;
    const page = Number(req.query.page) || 1;
    const limit = Number(process.env.PRODUCTS_PER_PAGE) || 8;

    const skip = (page - 1) * limit;
    const baseQuery: baseQueryType = {};

    if (search) {
      baseQuery.name = {
        $regex: search,
        $options: "i",
      };
    }
    if (price) {
      baseQuery.price = {
        $lte: Number(price),
      };
    }
    if (category) {
      baseQuery.category = category;
    }
    const productPromise = Product.find(baseQuery)
      .sort(sort ? { price: sort === "asc" ? 1 : -1 } : undefined)
      .limit(limit)
      .skip(skip);

    const [products, filteredOnlyProducts] = await Promise.all([
      productPromise,
      Product.find(baseQuery),
    ]);

    const totalPage = Math.ceil(filteredOnlyProducts.length / limit);

    return res.status(200).json({
      status: "success",
      products,
      page,
      totalPage,
    });
  }
);
