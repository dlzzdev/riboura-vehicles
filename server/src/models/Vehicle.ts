import { connect } from "../db/connect";
import mongoose from "mongoose";

const Vehicle = mongoose.model(
  "Vehicles",
  new mongoose.Schema(
    {
      brand: {
        type: String,
        required: true,
      },
      model: {
        type: String,
        required: true,
      },
      years: {
        type: String,
        required: true,
      },
      shift: {
        type: String,
        required: true,
      },
      fuel: {
        type: String,
        required: true,
      },
      steering: {
        type: String,
        required: true,
      },
      motor_power: {
        type: String,
        required: true,
      },
      type: {
        type: String,
        required: true,
      },
      mileage: {
        type: Number,
        required: true,
      },
      color: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
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

export default Vehicle;
