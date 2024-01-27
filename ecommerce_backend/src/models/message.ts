import mongoose from "mongoose";
interface IMessage extends Document {
  name: string;
  email: string;
  phone: string;
  message: string;
}
const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please enter name"],
    },
    email: {
      type: String,
      required: [true, "please enter email"],
    },
    phone: {
      type: String,
      required: [true, "please enter phone"],
    },
    message: {
      type: String,
      required: [true, "please enter message"],
    },
  },
  { timestamps: true }
);

export const Message = mongoose.model<IMessage>("Messages", schema);
