import cors from "cors";
import "dotenv/config";
import express from "express";
import userRoutes from "./src/routes/userRoutes.js";
import urlRoutes from "./src/routes/urlRoutes.js";
import googleAuthRoute from "./src/routes/googleAuthRoute.js";
import session from "express-session";
import passport from "passport";

export const app = express();


//middlewares
app.use(cors());
app.use(express.json());
app.use(session({secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: true}))
app.use(passport.initialize())
app.use(passport.session())

//Rutas
app.use("/users", userRoutes);
app.use("/urls", urlRoutes);
app.use("/", googleAuthRoute);


app.get("/", (_, res) => {
  res.status(200).json({ message: "Welcome to my API" });
});

app.get("*", (_, res) => {
  res.status(404).send("Route not found");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`server running on port http://localhost:${PORT}`);
});
