import authService from "./auth.service.js";
import jwt from "jsonwebtoken";
import "dotenv/config";

let refreshToken

async function login(req, res) {
  const { username, password } = req.body;
  try {
    // const loggeduser = await authService.login( //need to create a db or just return a new obj with id to continue.
    //   username,
    //   password
    // );
    const loggedUser = {
      ID: 1,
      username,
      password,
    };
    delete loggedUser.password;
    const refreshToken = jwt.sign( // source of truth refresh token
      {
        data: loggedUser,
      },
      process.env.JWT_REFRESH_SECRET, // value in README.md file
      {
        expiresIn: "2 days",
      }
    );
    const accessToken = jwt.sign({ data: loggedUser }, process.env.JWT_SECRET, { expiresIn: "15m" });
    loggedUser.accessToken = accessToken //adding the access token in memory instead of storing it for JS access.
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });
    res.json(loggedUser);
  } catch (err) {
    console.error("Failed to Login " + err);
    res.status(401).send({ err: "Failed to Login" });
  }
}

async function checkRefreshToken(req,res) {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.status(403).json({ message: "No token" });
  
    try {
      const user = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET).data;
      const accessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "15m" });
      user.accessToken = accessToken
      res.json({ user });
    } catch (err) {
      res.status(403).json({ message: "Invalid token" });
    }
}

async function logout(req, res) {
  try {
    // req.session.destroy()
    req.session.user = null;
    res.send({ msg: "Logged out successfully" });
  } catch (err) {
    res.status(500).send({ err: "Failed to logout" });
  }
}

export { login, logout, checkRefreshToken };
