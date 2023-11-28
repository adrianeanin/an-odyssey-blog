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
const jwt = require("jsonwebtoken");
const config = require("../utils/config");
const User = require("../models/user");

const tokenExtractor = (req, res, next) => {
  const authorization = req.get("authorization");

  if (authorization && authorization.startsWith("Bearer ")) {
    const token = authorization.replace("Bearer ", "");
    req.token = token;
  }

  next();
};

const userExtractor = async (req, res, next) => {
  const token = req.token;

  if (token) {
    const decodedToken = jwt.verify(token, config.SECRET);

    if (decodedToken.id) {
      const user = await User.findById(decodedToken.id);
      req.user = user;
    }
  }

  next();
};

const authenticateJWT = (req, res, next) => {
  const token = req.token;

  const decodedToken = jwt.verify(token, config.SECRET);
  if (!decodedToken || !decodedToken.id) {
    return res.status(401).json({ error: "Token invalid" });
  }

  next();
};

router.get("/posts", tokenExtractor, userExtractor, authenticateJWT, getPosts);

router.get("/published-posts", getPublishedPosts);

router.get("/posts/:id", getPost);

router.post(
  "/create-post",
  tokenExtractor,
  userExtractor,
  authenticateJWT,
  createPost
);

router.put(
  "/posts/:id",
  tokenExtractor,
  userExtractor,
  authenticateJWT,
  updatePost
);

router.delete(
  "/posts/:id",
  tokenExtractor,
  userExtractor,
  authenticateJWT,
  deletePost
);

module.exports = router;
