import express from "express";
import {
  fetchAllUsers,
  userLogin,
  userLogout,
  userSignUp,
} from "../controllers/userControllers.js";

const router = express.Router();
router.route("/signup").post(userSignUp);
router.route("/login").post(userLogin);
router.route("/logout").get(userLogout);
router.route("/users").get(fetchAllUsers);

export default router;
