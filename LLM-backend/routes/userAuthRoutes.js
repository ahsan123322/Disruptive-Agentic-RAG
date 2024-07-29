import express from "express";
import {
  loginController,
  logoutController,
  refetchUser,
  registerController,
} from "../controllers/userAuthController.js";
const route = express.Router();
//routes
route.post("/register", registerController);
route.post("/login", loginController);
route.post("/logout", logoutController);
route.get("/refetch", refetchUser);
export default route;
