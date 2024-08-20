import jwt from "jsonwebtoken";
import "dotenv/config";
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

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Not all parameters were provided" });
    }
    const user = await userModels.verifyuser(email, password);
    console.log(user);
    const token = jwt.sign(
      { email: user.email, id: user.id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    res.status(200).json({
      name: user.name,
      email: user.email,
      token,
    });
  } catch (error) {
    if (error.code === 401) {
      res.status(401).json({ message: error.message });
    } else if (error.code === 404) {
      res.status(404).json({ message: error.message });
    } else {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
};

const getLoggedInUser = async (req, res) => {
  try {
    const authorization = req.header("Authorization");
    const token = authorization.split("Bearer ")[1];
    const { id } = jwt.decode(token, process.env.JWT_SECRET);
    const user = await userModels.loggedInUser(id);
    res.status(200).json({ message: "user", user });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const userControllers = {
  registerUser,
  loginUser,
  getLoggedInUser,
};
