import mongoose, { Document, Schema } from "mongoose";

export interface CategoryType extends Document {
  name: string;
}

const categorySchema: Schema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      unique: true,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<CategoryType>("Category", categorySchema);
