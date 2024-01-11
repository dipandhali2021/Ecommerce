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
// import {faker} from "@faker-js/faker";

//revalidate on new update or delete product and new order

export const getLatestProducts = tryCatch(async (req, res, next) => {
  let products;
  if (myCache.has("latest-product")) {
    products = JSON.parse(myCache.get("latest-product") as string);
  } else {
    products = await Product.find({}).sort({ createdAt: -1 }).limit(5);
    myCache.set("latest-product", JSON.stringify(products));
  }
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

    await invalidateCache({ product: true });
    return res.status(201).json({
      status: true,
      message: "Product created successfully",
    });
  }
);

export const updateProduct = tryCatch(async (req, res, next) => {
  const { id } = req.params;
  const { name, category, price, stock } = req.body;
  const photo = req.file;
  const product = await Product.findById(id);
  if (!product) return next(new ErrorHandler("Product not found", 404));

  if (photo) {
    rm(product.photo!, () => {
      console.log("Old Photo deleted");
    });
    product.photo = photo.path;
  }

  if (name) product.name = name;
  if (category) product.category = category;
  if (price) product.price = price;
  if (stock) product.stock = stock;
  await product.save();
  await invalidateCache({ product: true ,productId:String(product._id)});
  return res.status(200).json({
    status: true,
    message: "Product Updated successfully",
  });
});

export const deleteProduct = tryCatch(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) return next(new ErrorHandler("Product not found", 404));
  rm(product.photo!, () => {
    console.log("Product Photo deleted");
  });
  await product.deleteOne();
  await invalidateCache({ product: true ,productId:String(product._id)});
  return res.status(200).json({
    status: "success",
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

// const generateRandomProducts = async (count:number  = 10) => {
//   const products = [];
//   for (let i = 0; i < count; i++) {
//     const product = {
//       name: faker.commerce.productName(),
//       photo: "uploads\\ccb34a01-a9b1-474f-94b4-1e11ff724d55.png",
//       price: faker.commerce.price({min:1500,max:80000,dec:0}),
//       stock: faker.commerce.price({min:0,max:1000,dec:0}),
//       category: faker.commerce.department(),
//       createdAt: new Date(faker.date.past()),
//       updatedAt: new Date(faker.date.recent()),
//       __v: 0,
//     };
//     products.push(product);
//   }
//   await Product.create(products);
//   console.log({success:true, message:"Products created successfully"});

// }

// const deleteRandomProducts = async (count:number  = 10) => {

//   const products = await Product.find({}).skip(2);
//   for (let i = 0; i < products.length; i++) {
//     const product = products[i];
//     await product.deleteOne();
//   }
//   console.log({success:true, message:"Products deleted successfully"});
// }
