import express from "express";
import NodeCache from "node-cache";
import { config } from "dotenv";

//importing routes
import userRoute from "./routes/user.js";
import productRoute from "./routes/product.js";
import orderRoute from "./routes/order.js";
import { connectDB } from "./utils/features.js";
import { ErrorMiddleware } from "./middlewares/error.js";
import morgan from "morgan";
config({
  path: "./.env",
});

const port = process.env.PORT || 4000;
const mongoURI = process.env.MONGO_URI || "";
connectDB(mongoURI);
export const myCache = new NodeCache();
const app = express();

app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("API is running");
});

//using routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/product", productRoute);
app.use("/api/v1/order", orderRoute);

app.use("/uploads", express.static("uploads"));
app.use(ErrorMiddleware);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
