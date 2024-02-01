import express from "express";
import NodeCache from "node-cache";
import { config } from "dotenv";

//importing routes
import userRoute from "./routes/user.js";
import productRoute from "./routes/product.js";
import orderRoute from "./routes/order.js";
import paymentRoute from "./routes/payment.js";
import dashboardRoute from "./routes/stats.js";
import messageRoute from "./routes/message.js";
import { connectDB } from "./utils/features.js";
import { ErrorMiddleware } from "./middlewares/error.js";
import cors from "cors";
import morgan from "morgan";
import Stripe from "stripe";
config({
  path: "./.env",
});

const port = process.env.PORT || 4000;
const mongoURI = process.env.MONGO_URI || "";
const stripeKey = process.env.STRIPE_KEY || "";
connectDB(mongoURI);
export const stripe = new Stripe(stripeKey);

export const myCache = new NodeCache();
const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

app.get("/", (req, res) => {
  res.send("API is running");
});

//using routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/product", productRoute);
app.use("/api/v1/order", orderRoute);
app.use("/api/v1/payment", paymentRoute);
app.use("/api/v1/payment", paymentRoute);
app.use("/api/v1/dashboard", dashboardRoute);
app.use("/api/v1/message", messageRoute);

app.use("/uploads", express.static("uploads"));
app.use(ErrorMiddleware);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
