import jwt from "jsonwebtoken";
import "dotenv/config";
const { verify } = jwt;

const verifyValidToken = (req, res, next) => {
  const verifyToken = req.headers.authorization;

  if (!verifyToken) {
    return res
      .status(401)
      .json({ message: "Unauthorized, token not provided" });
  }

  const [bearer, token] = verifyToken.split(" ");

  if (bearer !== "Bearer" || !token) {
    return res.status(401).json({ message: "Invalid token" });
  }

  try {
    verify(token, process.env.JWT_SECRET);
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export default verifyValidToken;
