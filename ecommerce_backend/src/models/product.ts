import mongoose from "mongoose";


interface IProduct extends Document {
  name: string;
  photo: string;
  price: number;
  stock: number;
  category: string;
  createdAt: Date;
  updatedAt: Date;
}

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please enter name"],
    },
    photo: {
      type: String,
      required: [true, "please enter photo"],
    },
    price: {
      type: Number,
      required: [true, "please enter price"],
    },
    stock: {
      type: Number,
      required: [true, "please enter stock"],
    },
    category: {
      type: String,
      required: [true, "please enter category "],
      trim: true,
    },
  },
  { timestamps: true }
);

export const Product = mongoose.model<IProduct>("Product", schema);
