import { Router } from "express";
import { urlController } from "../controllers/urlController.js";

const router = Router();

router.post("/", urlController.registerUrls);
router.get("/long-url/:shortUrl", urlController.getOriginalUrl);

export default router;
