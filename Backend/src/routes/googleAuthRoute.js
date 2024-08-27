import express from "express";
const router = express.Router();
import passport from "../config/passportConfig.js";
import jwt from "jsonwebtoken";
import "dotenv/config";

const isProduction = process.env.NODE_ENV === "production";
const redirectURL = isProduction
  ? process.env.REDIRECT_URL_PROD
  : process.env.REDIRECT_URL_DEV;

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    try {
      console.log("usuario auth: ", req.user);
      const token = jwt.sign(
        { email: req.user.email, id: req.user.id },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );
      res.redirect(`${redirectURL}?token=${token}`);
      console.log("Token generado: ", token);
    } catch (error) {
      console.log("Error en el callback", error);
      res.status(500).json({ mensaje: "Internal server error" });
    }
  }
);

export default router;
