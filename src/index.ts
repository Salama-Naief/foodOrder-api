import path from "node:path";

import express, { Request, Response } from "express";
import session from "express-session";
import passport from "passport";
import dotenv from "dotenv";
import "express-async-errors";
import "./middelwares/passport.middleware";
import { conncetDB } from "./db/connect-db";
import { errorHandler } from "./middelwares";
import { mountedRoute } from "./routes";

//consts
const app = express();
const port = 8000;
dotenv.config();

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//@desc serve static files from files uploads in the root
app.use(express.static(path.join(process.cwd(), "uploads")));
app.use(
  session({
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

//@desc routes
mountedRoute(app);
app.post("/", (req: Request, res: Response) => {
  res.send("goood news");
});
app.use("/", (req: Request, res: Response) => {
  console.log(req);
  res.send("route is not found");
});
app.use(errorHandler);

//start function
const start = async () => {
  try {
    await conncetDB();
    app.listen(port, () => {
      console.log(`app listing to port=${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
