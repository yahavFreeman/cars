import express from "express";
import { login, logout, checkRefreshToken } from "./auth.controller.js";

const authRoutes = express.Router();

authRoutes.post("/login", login);
authRoutes.post("/refresh-token", checkRefreshToken);
authRoutes.post("/logout", logout);

export { authRoutes };
