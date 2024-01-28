import express from "express";

import { adminOnly } from "../middlewares/auth.js";
import {
  deleteMessage,
  getAllMessages,
  newMessage,
} from "../controllers/message.js";
import multer from "multer";

const app = express.Router();
const upload = multer();

//route - /api/v1/oder/new
app.post("/new", upload.none(), newMessage);
app.get("/all", adminOnly, getAllMessages);
app.delete("/delete/:id", adminOnly, deleteMessage);

export default app;
