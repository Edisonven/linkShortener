import jwt from "jsonwebtoken";
import { userModels } from "../models/userModels.js";

const registerUser = async (req, res) => {
  try {
    const user = req.body;
    await userModels.createUser(user);
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const userControllers = {
  registerUser,
};
