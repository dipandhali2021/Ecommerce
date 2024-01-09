import express from "express";


//importing routes
import userRoute from "./routes/user.js";
import { connectDB } from "./utils/features.js";
import { ErrorMiddleware } from "./middlewares/error.js";

const port = 4000;
connectDB();
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running");
});
//using routes
app.use("/api/v1/user", userRoute);

app.use(ErrorMiddleware);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
