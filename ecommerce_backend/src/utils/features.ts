import mongoose from "mongoose";
import { myCache } from "../app.js";
import { Product } from "../models/product.js";
import { OrderItemType, invalidateCacheProps } from "../types/types.js";
import ErrorHandler from "./utility-class.js";

export const connectDB = async (uri: string) => {
  mongoose
    .connect(uri, {
      dbName: "ecommerce",
    })
    .then((c) => console.log(`connected to ${c.connection.host}`))
    .catch((err) => console.log(err));
};

export const invalidateCache = async ({
  product,
  admin,
  order,
  userId,
  orderId,
  productId,
}: invalidateCacheProps) => {
  if (product) {
    const productKeys: string[] = [
      "latest-product",
      "categories",
      "all-products",
    ];

    if (typeof productId === "string") {
      productKeys.push(`product-${productId}`);
    }
    if (typeof productId === "object") {
      productKeys.forEach((i) => productKeys.push(`product-${i}`));
    }

    myCache.del(productKeys);
  }
  if (order) {
    const orderKeys: string[] = [
      "all-orders",
      `my-orders-${userId}`,
      `order-${orderId}`,
    ];

    myCache.del(orderKeys);
  }
  if (admin) {
  }
};

export const reduceStock = async (orderItems: OrderItemType[]) => {
  for (let i = 0; i < orderItems.length; i++) {
    const order = orderItems[i];
    const product = await Product.findById(order.productId);
    if (!product) throw new ErrorHandler("product not found", 404);
    product.stock -= order.quantity;
    await product.save();
  }
};


export const calculatePercentage = (thisMonth: number, lastMonth: number) => {
  if(lastMonth === 0) return Number((thisMonth * 100).toFixed(0));
  const percent = ((thisMonth - lastMonth) / lastMonth) * 100;
  return Number(percent.toFixed(0));
};
