import jwt from "jsonwebtoken";
import { urlModels } from "../models/urlModels.js";

const registerUrls = async (req, res) => {
  try {
    let id = null;
    const authorization = req.header("Authorization");

    if (authorization) {
      const token = authorization.split("Bearer ")[1];
      const decodedToken = jwt.decode(token);
      if (decodedToken) {
        id = decodedToken.id;
      }
    }

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
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

const getOriginalUrl = async (req, res) => {
  try {
    const { shortUrl } = req.params;

    if (!shortUrl) {
      return res.status(400).json({ message: "Short URL is required" });
    }

    const longUrl = await urlModels.originalURL(shortUrl);

    res.status(200).json({ message: "Original URL found", url: longUrl });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const getUserUrls = async (req, res) => {
  try {
    const authorization = req.header("Authorization");
    const token = authorization.split("Bearer ")[1];
    const { id } = jwt.decode(token);
    const data = await urlModels.userUrls(id);
    res.status(200).json({ message: "Data found", data });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const urlController = {
  registerUrls,
  getOriginalUrl,
  getUserUrls,
};
