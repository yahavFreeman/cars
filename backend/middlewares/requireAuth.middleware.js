import jwt from "jsonwebtoken";
import "dotenv/config";
import { checkRefreshToken } from "../api/auth/auth.controller.js";
const requireAuth = (req, res, next) => { // for an extensive explanation regarding JWT tokens, please reffer to the README.md file
  const authHeader = req.headers.authorization;
  const refreshToken = req.cookies["refreshToken"];
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return checkRefreshToken(req, res);
  }

  const accessToken = authHeader.split(" ")[1];

  // Verify the access token
  jwt.verify(accessToken, process.env.JWT_SECRET, (err, decoded) => { 
    if (err) {
      if (err.name === "TokenExpiredError" && refreshToken) {
        // Token expired, attempt to refresh
        jwt.verify(
          refreshToken,
          process.env.JWT_REFRESH_SECRET,
          (refreshErr, refreshDecoded) => {
            if (refreshErr) {
              return res.status(403).json({ message: "Invalid refresh token" });
            }

            // create a new access token
            const newAccessToken = jwt.sign(
              { id: refreshDecoded.data.ID },
              process.env.ACCESS_TOKEN_SECRET,
              { expiresIn: "15m" }
            );

            // Send the new token in the response
            res.set("Authorization", `Bearer ${newAccessToken}`);

            // Attach user data to the request
            req.user = refreshDecoded.data;
            next();
          }
        );
      } else {
        res.clearCookie("refreshToken");
        return res.status(403).json({ message: "Invalid access token" });
      }
    } else {
      // Token is valid
      req.user = decoded; // Attach user data to request
      next();
    }
  });
};

export { requireAuth };
