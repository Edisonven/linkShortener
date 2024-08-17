import { Router } from "express";
import { userControllers } from "../controllers/userControllers.js";
import verifyValidToken from "../middlewares/verifyToken.js";

const router = Router();

router.post("/register", userControllers.registerUser);
router.post("/login", userControllers.loginUser);
router.get("/user", verifyValidToken, userControllers.getLoggedInUser);

export default router;
