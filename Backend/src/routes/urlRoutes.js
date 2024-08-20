import { Router } from "express";
import { urlController } from "../controllers/urlController.js";
import verifyValidToken from "../middlewares/verifyToken.js";
const router = Router();

router.post("/", verifyValidToken, urlController.registerUrls);

export default router;
