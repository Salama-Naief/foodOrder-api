import mongoose from "mongoose";

export const conncetDB = async () => {
  const url = process.env.DATA_BASE_URI as string;
  return await mongoose.connect(url);
};
