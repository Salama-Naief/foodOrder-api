import mongoose, { Document, Schema } from "mongoose";

export interface CuisineType extends Document {
  name: string;
}

const cuisineSchema: Schema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      unique: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<CuisineType>("Cuisine", cuisineSchema);
