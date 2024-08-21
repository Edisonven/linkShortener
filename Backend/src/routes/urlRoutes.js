import { Router } from "express";
import { urlController } from "../controllers/urlController.js";
import verifyValidToken from "../middlewares/verifyToken.js";

const router = Router();

router.post("/", urlController.registerUrls);
router.get("/long-url/:shortUrl", urlController.getOriginalUrl);
router.get("/user-url/:id", verifyValidToken, urlController.getUserUrls);
router.patch("/edit-url", verifyValidToken, urlController.updateRegisteredUrl);

export default router;
