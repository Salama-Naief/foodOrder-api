import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  password: string;
  changePasswordAt: Date;
  passwordResetCodeExpires: Date;
  passwordResetCode: string;
  passwordResetCodeVerified: boolean;
  username: string;
  email: string;
  address: string;
  phone: string;
  isSeller: boolean;
  role: string;
}
const userSchema: Schema = new Schema(
  {
    username: {
      type: String,
      required: [true, "please enter username"],
      trim: true,
      minLength: [3, "too short username"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
      lowerCase: true,
      trim: true,
      unique: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please provide a valid email",
      ],
    },
    address: {
      type: String,
      required: false,
      default: "",
    },
    phone: {
      type: String,
      required: false,
    },
    isSeller: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ["admin", "user", "manager"],
      default: "user",
    },
  },
  { timestamps: true, discriminatorKey: "provider" }
);

export default mongoose.model<IUser>("User", userSchema);
