import express from "express";

const router = express.Router();

import {
  createPost,
  deletePost,
  getAllPosts,
  updatePost,
} from "../controllers/postController";

router.route("/").get(getAllPosts).post(createPost);

router.route("/:id").put(updatePost).delete(deletePost);

export default router;
