const express = require("express");
const router = express.Router();
const {
  getComments,
  addComment,
  deleteComment,
} = require("../controllers/commentsController");
const middleware = require("../utils/middleware");

router.get("/posts/:id/comments", getComments);

router.post("/posts/:id/comments", addComment);

router.delete(
  "/posts/:id/comments/:commentId",
  middleware.tokenExtractor,
  middleware.userExtractor,
  middleware.authenticateJWT,
  deleteComment
);

module.exports = router;
