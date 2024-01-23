import { stripe } from "../app.js";
import { tryCatch } from "../middlewares/error.js";
import { Coupon } from "../models/coupon.js";
import ErrorHandler from "../utils/utility-class.js";

export const createPaymentIntent = tryCatch(async (req, res, next) => {
  const { amount } = req.body;
  if (!amount) {
    return next(new ErrorHandler("Please enter amount", 400));
  }

  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: "INR",
    description: "payment for ecommerce app",
    shipping: {
      name: "Jenny Rosen",
      address: {
        line1: "510 Townsend St",
        postal_code: "98140",
        city: "San Francisco",
        state: "CA",
        country: "US",
      },
    },
  });

  return res.status(201).json({
    status: "success",
    clientSecret: paymentIntent.client_secret,
  });
});

export const newCoupon = tryCatch(async (req, res, next) => {
  const { coupon, amount } = req.body;

  if (!coupon || !amount) {
    return next(new ErrorHandler("Please fill all the fields", 400));
  }
  await Coupon.create({ code: coupon, amount });

  return res.status(201).json({
    status: "success",
    message: `Coupon ${coupon} created successfully`,
  });
});

export const appplyDiscount = tryCatch(async (req, res, next) => {
  const { coupon } = req.query;
  const discount = await Coupon.findOne({ code: coupon });
  if (!discount) {
    return next(new ErrorHandler("Invalid Coupon", 400));
  }

  return res.status(200).json({
    status: "success",
    discount: discount.amount,
  });
});

export const allCoupons = tryCatch(async (req, res, next) => {
  const coupons = await Coupon.find({});
  return res.status(200).json({
    status: "success",
    coupons,
  });
});

export const deleteCoupon = tryCatch(async (req, res, next) => {
  const { id } = req.params;
  const coupon = await Coupon.findByIdAndDelete(id);
  if (!coupon) return next(new ErrorHandler("Coupon not found", 404));
  return res.status(200).json({
    status: "success",
    message: `Coupon  deleted successfully`,
  });
});
