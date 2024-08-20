import { Router } from "express";
import { urlController } from "../controllers/urlController.js";
import verifyValidToken from "../middlewares/verifyToken.js";
const router = Router();

router.post("/", urlController.registerUrls);
router.get("/short-url", verifyValidToken, urlController.getShortUrl);

export default router;
