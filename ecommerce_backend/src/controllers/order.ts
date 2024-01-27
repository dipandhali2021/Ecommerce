import { tryCatch } from "../middlewares/error.js";
import { Order } from "../models/order.js";
import { NewOrderRequstBody } from "../types/types.js";
import { Request } from "express";
import { invalidateCache, reduceStock } from "../utils/features.js";
import ErrorHandler from "../utils/utility-class.js";
import { myCache } from "../app.js";

export const newOrder = tryCatch(
  async (req: Request<{}, {}, NewOrderRequstBody>, res, next) => {
    const {
      shippingInfo,
      orderItems,
      user,
      subtotal,
      tax,
      shippingCharge,
      discount,
      total,
    } = req.body;
    if (!shippingInfo || !orderItems || !user || !subtotal || !tax || !total) {
      return next(new ErrorHandler("Please fill all the fields", 400));
    }
    await Order.create({
      shippingInfo,
      orderItems,
      user,
      subtotal,
      tax,
      shippingCharge,
      discount,
      total,
    });

    await reduceStock(orderItems);
    invalidateCache({
      order: true,
      product: true,
      admin: true,
      userId: user,
      productId: orderItems.map((item) => String(item.productId)),
    });
    return res.status(201).json({
      status: "success",
      message: "order placed successfully",
    });
  }
);

export const myOrders = tryCatch(async (req: Request, res, next) => {
  const { id: user } = req.query;
  const key = `my-orders-${user}`;
  if (!user) {
    return next(new ErrorHandler("Please provide user id", 400));
  }
  let orders;
  if (myCache.has(key)) orders = JSON.parse(myCache.get(key) as string);
  else {
    orders = await Order.find({ user });
    myCache.set(key, JSON.stringify(orders));
  }
  return res.status(200).json({
    status: "success",
    orders,
  });
});

export const myOrdersDelete = tryCatch(async (req: Request, res, next) => {
  const { userId, orderId } = req.query;

  if (!userId || !orderId) {
    return next(new ErrorHandler("Please provide  all the fields", 400));
  }
  const order = await Order.findById(orderId);
  if (!order) return next(new ErrorHandler("Order not found", 404));
  await order.deleteOne();
  invalidateCache({
    order: true,
    product: false,
    admin: true,
    userId: order.user,
    orderId: String(order._id),
  });
  return res.status(200).json({
    status: "success",
    message: "order deleted successfully",
  });
});

export const allOrders = tryCatch(async (req: Request, res, next) => {
  const key = `all-orders`;
  let orders;
  if (myCache.has(key)) orders = JSON.parse(myCache.get(key) as string);
  else {
    orders = await Order.find().populate("user", "name");
    myCache.set(key, JSON.stringify(orders));
  }

  return res.status(200).json({
    status: "success",
    orders,
  });
});

export const getSingleOrder = tryCatch(async (req: Request, res, next) => {
  const key = `order-${req.params.id}`;
  let order;
  if (myCache.has(key)) order = JSON.parse(myCache.get(key) as string);
  else {
    order = await Order.findById(req.params.id).populate("user", "name");
    if (!order) return next(new ErrorHandler("Order not found", 404));
    myCache.set(key, JSON.stringify(order));
  }
  res.status(200).json({
    status: "success",
    order,
  });
});

export const processOrder = tryCatch(async (req: Request, res, next) => {
  const id = req.params.id;
  const order = await Order.findById(id);
  if (!order) return next(new ErrorHandler("Order not found", 404));
  switch (order.status) {
    case "Processing":
      order.status = "Shipped";
      break;
    case "Shipped":
      order.status = "Delivered";
      break;
    default:
      order.status = "Delivered";
  }

  await order.save();
  invalidateCache({
    order: true,
    product: false,
    admin: true,
    userId: order.user,
    orderId: String(order._id),
  });
  return res.status(200).json({
    status: "success",
    message: "order processed successfully",
    order,
  });
});
export const deleteOrder = tryCatch(async (req: Request, res, next) => {
  const id = req.params.id;
  const order = await Order.findById(id);
  if (!order) return next(new ErrorHandler("Order not found", 404));
  await order.deleteOne();
  invalidateCache({
    order: true,
    product: false,
    admin: true,
    userId: order.user,
    orderId: String(order._id),
  });
  return res.status(200).json({
    status: "success",
    message: "order deleted successfully",
  });
});
