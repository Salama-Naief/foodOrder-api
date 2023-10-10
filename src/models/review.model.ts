import mongoose, { Schema } from "mongoose";

const reviewSchema = new Schema(
  {
    message: {
      type: String,
      trim: true,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "loging frist"],
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "review must belong to product"],
    },
    rate: {
      type: Number,
      required: [true, "choose your rate"],
      max: [5, "rate must be less than 5"],
      min: [0, "rate must be grater than 0"],
      default: 5,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Review", reviewSchema);
