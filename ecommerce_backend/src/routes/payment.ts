import express from "express";
import {
  allCoupons,
  appplyDiscount,
  createPaymentIntent,
  deleteCoupon,
  newCoupon,
} from "../controllers/payment.js";
import { adminOnly } from "../middlewares/auth.js";

const app = express.Router();

app.post("/create", createPaymentIntent);

app.get("/discount", appplyDiscount);

app.post("/coupon/new", adminOnly, newCoupon);

app.get("/coupon/all", adminOnly, allCoupons);

app.delete("/coupon/:id", adminOnly, deleteCoupon);

export default app;
