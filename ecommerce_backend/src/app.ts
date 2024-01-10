import express from "express";
import NodeCache from "node-cache";

//importing routes
import userRoute from "./routes/user.js";
import productRoute from "./routes/product.js";
import { connectDB } from "./utils/features.js";
import { ErrorMiddleware } from "./middlewares/error.js";

const port = 4000;
connectDB();
export const myCache = new NodeCache();
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running");
});
//using routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/product", productRoute);

app.use("/uploads", express.static("uploads"));
app.use(ErrorMiddleware);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
