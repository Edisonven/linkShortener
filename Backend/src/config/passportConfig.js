import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import "dotenv/config";
import { userModels } from "../models/userModels.js";

const isProduction = process.env.NODE_ENV === "production";
const callbackURL = isProduction
  ? process.env.GOOGLE_CALLBACK_URL_PROD
  : process.env.GOOGLE_CALLBACK_URL_DEV;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: callbackURL,
    },

    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value;
        const name = profile.displayName || "Unknown";

        let user = await userModels.findUserByEmail(email);

        if (!user) {
          const password = "123456789109910";
          user = await userModels.createUser({ name, email, password });
        }

        console.log("Usuario registrado: ", user);
        return done(null, user);
      } catch (error) {
        console.log("Error during authentication", error);
        return done(error, null);
      }
    }
  )
);

passport.serializeUser(async (user, done) => {
  try {
    console.log("Serializing user: ", user);
    done(null, user.id);
  } catch (error) {
    console.error("Error serializing user", error);
    done(error, null);
  }
});

passport.deserializeUser(async (id, done) => {
  try {
    console.log("Deserializing user ID:", id);
    const user = await userModels.loggedInUser(id);
    if (!user) {
      console.log("User not found, trying to create the user again...");
      // Opcional: Redirigir a la página de inicio de sesión o tomar alguna otra acción
      done(null, false); // Pasar 'false' o 'null' en lugar de un usuario válido
    } else {
      done(null, user);
    }
  } catch (error) {
    console.error("Error deserializing user", error);
    done(error, null);
  }
});

export default passport;
