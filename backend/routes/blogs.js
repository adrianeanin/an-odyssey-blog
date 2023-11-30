const express = require("express");
const router = express.Router();
const {
  getPosts,
  getPublishedPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
} = require("../controllers/blogController");
const middleware = require("../utils/middleware");

router.get(
  "/posts",
  middleware.tokenExtractor,
  middleware.userExtractor,
  middleware.authenticateJWT,
  getPosts
);

router.get("/published-posts", getPublishedPosts);

router.get("/posts/:id", getPost);

router.post(
  "/create-post",
  middleware.tokenExtractor,
  middleware.userExtractor,
  middleware.authenticateJWT,
  createPost
);

router.put(
  "/posts/:id",
  middleware.tokenExtractor,
  middleware.userExtractor,
  middleware.authenticateJWT,
  updatePost
);

router.delete(
  "/posts/:id",
  middleware.tokenExtractor,
  middleware.userExtractor,
  middleware.authenticateJWT,
  deletePost
);

module.exports = router;
