import { Router } from "express";
import { userControllers } from "../controllers/userControllers.js";
import verifyValidToken from "../middlewares/verifyToken.js";

const router = Router();

router.post("/register", userControllers.registerUser);
router.post("/login", userControllers.loginUser);
router.get("/user", verifyValidToken, userControllers.getLoggedInUser);
router.patch("/user", verifyValidToken, userControllers.updateUserData);
router.patch("/user/password", verifyValidToken, userControllers.updateUserPassword);

export default router;
