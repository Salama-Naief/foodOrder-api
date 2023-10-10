import { Request } from "express";
import passport from "passport";
import localAuth from "passport-local";
import localUserModel, { ILocalUser } from "../models/local-user.model";
import userModel, { IUser } from "../models/user.model";

const localStrategy = localAuth.Strategy;

//serializeUser
passport.serializeUser((userId, done) => {
  done(null, userId);
});

passport.deserializeUser(async (userId, done) => {
  try {
    const user = await userModel.findById(userId);
    if (!user) {
      done(null, false);
    }
    done(null, user);
  } catch (error) {
    done(error, false);
  }
});

passport.use(
  "local",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      session: false,
      // passReqToCallback: true,
    },
    async function (email: string, password: string, done): Promise<any> {
      try {
        const user: any = await localUserModel
          .findOne({ email })
          .select("password");
        if (!user) {
          done(null, false);
        }
        //@ts-ignore
        const isMath = await user.isMatchPassword(password);
        if (!isMath) {
          done(null, false);
        }

        delete user._doc.password;
        return done(null, user._id);
      } catch (err) {
        done(err, false);
      }
    }
  )
);

export default passport;
