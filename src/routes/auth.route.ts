import express from "express";
import { register, authError } from "../controllers/auth.constroller";
import { registerValidator } from "../validation/auth.validator";
import passport from "passport";
import { BadRequestError } from "../errors";

const router = express.Router();
//@ts-ignore
router.post("/local/register", registerValidator, register);
router.post(
  "/local/login",
  passport.authenticate("local", {
    failureRedirect: "/api/auth/err",
  }),
  (req, res) => {
    req.method = "get";
    return res.redirect(303, "/api/users/me");
  }
);

router.use("/err", authError);
export default router;
