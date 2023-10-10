import mongoose, { Model, Schema, SchemaType } from "mongoose";

interface ProductType {
  title: string;
  description: string;
  price: number;
  discount: number;
  size: string;
  specialLevel: string;
  avalabilaty: boolean;
  numOfReviews: number;
  rate: number;
  owner: Schema.Types.ObjectId;
  category: Schema.Types.ObjectId;
  cuisine: Schema.Types.ObjectId;
  cover: string;
  images: string[];
}
const productSchema = new Schema<ProductType>(
  {
    title: {
      type: String,
      trim: true,
      unique: true,
      minLength: [3, "too short"],
      required: [true, "please enter product title"],
    },
    description: {
      type: String,
      required: [true, "please enter discription"],
      minLength: [10, "too short discription"],
    },
    price: {
      type: Number,
      required: [true, "enter price field"],
      default: 1,
    },
    discount: {
      type: Number,
      required: false,
    },
    size: {
      type: String,
      enum: ["sm", "md", "xs", "lg", "xl"],
      default: "sm",
    },
    specialLevel: {
      type: String,
      default: "",
    },
    avalabilaty: {
      type: Boolean,
      default: false,
    },
    numOfReviews: {
      type: Number,
      default: 0,
    },
    rate: {
      type: Number,
      max: [5, "rate must be less than 5"],
      min: [0, "rate must be grater than 0"],
      default: 0,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "you must be login"],
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "product must belong to category"],
    },
    cuisine: {
      type: Schema.Types.ObjectId,
      ref: "Cuisine",
      required: [true, "product must belong to Cuisine"],
    },
    cover: {
      type: String,
      required: true,
    },
    images: [{ type: String }],
  },
  { timestamps: true }
);

//coman function
const imageURL = (doc: any) => {
  if (doc.cover) {
    doc.cover = process.env.BASE_URL + "/" + "products" + "/" + doc.cover;
  }
  if (doc.images) {
    const images: string[] = [];
    doc.images.forEach((img: string) => {
      images.push(process.env.BASE_URL + "/" + "products" + "/" + img);
    });
    doc.images = images;
  }
};

//work in findOne,findAll,update
productSchema.post("init", function (doc) {
  imageURL(doc);
});

//work in findOne,findAll,update
productSchema.pre("find", function (next) {
  this.select("-images");
  next();
});

const populateObj = (type: string) => ({ path: type, select: "name" });

productSchema.pre("find", function () {
  this.populate(populateObj("category")).populate(populateObj("cuisine"));
});

productSchema.pre("findOne", function () {
  this.populate(populateObj("category")).populate(populateObj("cuisine"));
});

export default mongoose.model<ProductType>("Product", productSchema);
