import jwt from "jsonwebtoken";
import { urlModels } from "../models/urlModels.js";

const registerUrls = async (req, res) => {
  try {
    const authorization = req.header("Authorization");
    const token = authorization.split("Bearer ")[1];
    const { id } = jwt.decode(token);

    const { longUrl } = req.body;
    if (!longUrl) {
      return res
        .status(404)
        .json({ message: "Not all parameters were provided" });
    }

    const part1 = Math.random().toString(36).substring(2, 5);
    const part2 = Math.random().toString(36).substring(2, 5);

    const shortUrl = `${part1}-${part2}`;

    const urls = await urlModels.createUrl(id, longUrl, shortUrl);
    res.status(201).json({ message: "Short-url created successfully", urls });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const urlController = {
  registerUrls,
};
