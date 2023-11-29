const express = require("express");
const router = express.Router();
const {
  getComments,
  addComment,
  deleteComment,
} = require("../controllers/commentsController");

// router.get("/posts/:id/comments", getComments);

// router.post("/posts/:id/comments", addComment);

// router.delete(
//   "/posts/:id/comments/:commentId",
//   tokenExtractor,
//   userExtractor,
//   authenticateJWT,
//   deleteComment
// );

router.get("/posts/:id/comments", getComments);

router.post("/posts/:id/comments", addComment);

router.delete("/posts/:id/comments/:commentId", deleteComment);

module.exports = router;
