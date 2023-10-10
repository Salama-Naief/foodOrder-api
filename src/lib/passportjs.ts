import { Request } from "express";
import passport from "passport";
import localAuth from "passport-local";
import localUserModel, { ILocalUser } from "../models/local-user.model";
import { isMatchPassword } from "./isMatchPassword";
import { IUser } from "../models/user.model";

const localStrategy = localAuth.Strategy;

passport.use(
  new localStrategy(
    { usernameField: "email", passwordField: "password" },
    async function (email: string, password: string, done): Promise<any> {
      const user: IUser | null = await localUserModel.findOne({ email });
      if (!user) {
        done(null, false);
      }
      //@ts-ignore
      const isMath = await user.isMatchPassword(password);
      if (!isMath) {
        done(null, false);
      }
      const userCopy = { ...user };
      delete userCopy?.password;
      return done(null, userCopy);
    }
  )
);
