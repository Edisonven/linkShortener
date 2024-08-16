import cors from "cors";
import "dotenv/config";
import express from "express";

export const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to my API" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`server running on port http://localhost:${PORT}`);
});
