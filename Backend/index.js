import cors from "cors";
import "dotenv/config";
import express from "express";
import userRoutes from "./src/routes/userRoutes.js";
import urlRoutes from "./src/routes/urlRoutes.js";

export const app = express();

app.use(cors());
app.use(express.json());

//Rutas
app.use("/users", userRoutes);
app.use("/urls", urlRoutes);

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
