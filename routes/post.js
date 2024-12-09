import express from "express";
import isLoggedIn from "../middlewares/isLoggedIn.js";
import {
  createPost,
  deletePost,
  getPosts,
  updatePost,
} from "../controllers/postControllers.js";

const router = express.Router();

router.route("/post/create").post(isLoggedIn, createPost);
router.route("/post/update/:postId").put(isLoggedIn, updatePost);
router.route("/post/delete/:postId").delete(isLoggedIn, deletePost);
router.route("/posts").get(getPosts);

export default router;
