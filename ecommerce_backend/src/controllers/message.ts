import { myCache } from "../app.js";
import { tryCatch } from "../middlewares/error.js";
import { Message } from "../models/message.js";
import { invalidateCache } from "../utils/features.js";
import ErrorHandler from "../utils/utility-class.js";

export const newMessage = tryCatch(async (req, res, next) => {
  const { name, email, phone, message } = req.body;
  if (!name || !email || !message || !phone) {
    return next(
      new ErrorHandler("Please provide all the required fields", 400)
    );
  }

  await Message.create({
    name,
    email,
    message,
    phone,
  });

  res.status(201).json({
    success: true,
    message: "Message sent successfully",
  });
});

export const getAllMessages = tryCatch(async (req, res, next) => {
  let messages;
  if (myCache.has("messages")) {
    messages = JSON.parse(myCache.get("messages") as string);
  } else {
    messages = await Message.find({});
    myCache.set("messages", JSON.stringify(messages));
  }
  invalidateCache({ messages: true });
  return res.status(200).json({
    success: true,
    messages,
  });
});

export const deleteMessage = tryCatch(async (req, res, next) => {
  const id = req.params.id;
  const message = await Message.findById(id);
  if (!message) return next(new ErrorHandler("User not found", 404));

  await message.deleteOne();
  return res.status(200).json({
    success: true,
    message: "Message deleted successfully",
  });
});
