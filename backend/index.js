import express from "express";
import cors from "cors";
import path from "path";
import cookieParser from "cookie-parser";
import { fileURLToPath } from "url";
import { carsRoutes } from "./api/cars/cars.routes.js";
import { authRoutes } from "./api/auth/auth.routes.js";

const app = express();
const port = 3001; //port3001 for it to not interfere with react's 3000.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// checking the NODE_ENV which is being set by the npm script used to run the app, adding cors in development so it will be more secured and allowing less origins to connect.
const corsOptions = {
  origin: [
    "http://127.0.0.1:8080",
    "http://localhost:8080",
    "http://127.0.0.1:3000",
    "http://localhost:3000",
    "http://localhost",
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// routes
app.use("/api/auth", authRoutes); // make authentication related routes go to this specific router
app.use("/api/cars", carsRoutes); // make car related routes go to this specific router

app.get("/**", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(port, "0.0.0.0", () => {
  console.log("Server is running on port: " + port);
});
