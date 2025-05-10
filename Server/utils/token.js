import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res
      .status(401)
      .json({ Status: false, Error: "Access Denied: No token provided" });
  }

  jwt.verify(
    token,
    process.env.JWT_SECRET_KEY || "jwt_secret_key",
    (err, decoded) => {
      if (err) {
        return res.status(403).json({ Status: false, Error: "Invalid token" });
      }

      req.user = decoded; // contains id, email, role
      next();
    }
  );
};

export { verifyToken };
