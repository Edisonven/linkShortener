import { Router } from "express";
import { userControllers } from "../controllers/userControllers.js";

const router = Router();

router.post("/register", userControllers.registerUser);

export default router;
