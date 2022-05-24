import { connect } from "../db/connect";
import mongoose from "mongoose";

const Car = mongoose.model(
  "Car",
  new mongoose.Schema(
    {
      model: {
        type: String,
        required: true,
      },
      brand: {
        type: String,
        required: true,
      },
      year: {
        type: Number,
        required: true,
      },
      milage: {
        type: Number,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      description: {
        type: String,
      },
      images: {
        type: Array,
      },
      available: {
        type: Boolean,
      },
      user: Object,
      buyer: Object,
    },
    { timestamps: true }
  )
);

export default Car;
