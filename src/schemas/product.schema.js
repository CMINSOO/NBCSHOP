import mongoose from "mongoose";

const ShopSchema = new mongoose.Schema({
  item: {
    type: String,
    required: true,
  },
  iteminfo: {
    type: String,
    required: true,
  },
  seller: {
    type: String,
    required: true,
  },
  password: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: false,
  },
  order: {
    type: Number,
    required: true,
  },
  doneAt: {
    type: Date,
    required: false,
  },
  updatedAt: {
    type: Date,
    required: false,
  },
});

export default mongoose.model("Shop", ShopSchema);
