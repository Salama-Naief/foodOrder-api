import categoryRoute from "./category.route";
import cuisineRoute from "./cuisine.route";
import productRoute from "./product.route";
import reviewRoute from "./review.route";
import authRoute from "./auth.route";
import userRoute from "./user.route";

export const mountedRoute = (app: any) => {
  app.use("/api/categories", categoryRoute);
  app.use("/api/cuisines", cuisineRoute);
  app.use("/api/reviews", reviewRoute);
  app.use("/api/products", productRoute);
  app.use("/api/auth", authRoute);
  app.use("/api/users", userRoute);
};
