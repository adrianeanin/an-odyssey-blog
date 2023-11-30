const Blog = require("../models/blog");
const mongoose = require("mongoose");
require("express-async-errors");
const { body, validationResult } = require("express-validator");

const getComments = async (req, res) => {
  const { id } = req.params;

  const blog = await Blog.findById(id).populate("comments", { name: 1 });

  if (!mongoose.Types.ObjectId.isValid(id) || !blog) {
    return res.status(404).json({ error: "No such post" });
  }

  const comments = blog.comments;
  res.status(200).json(comments);
};

const addComment = [
  body("name").trim().notEmpty().withMessage("Kindly add a descriptive name"),
  body("text").trim().notEmpty().withMessage("Kindly add a comment to save"),
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const { id } = req.params;
    const { text, name } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "No such post" });
    }

    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({ error: "No such post" });
    }

    const newComment = {
      text,
      name,
    };

    blog.comments.push(newComment);
    await blog.save();

    res.status(201).json(newComment);
  },
];

const deleteComment = async (req, res) => {
  const { id, commentId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such comment" });
  }

  const blog = await Blog.findById(id);

  if (!blog) {
    return res.status(404).json({ error: "No such comment" });
  }

  blog.comments = blog.comments.filter(
    (comment) => comment._id.toString() !== commentId
  );

  await blog.save();

  res.status(204).end();
};

module.exports = {
  getComments,
  addComment,
  deleteComment,
};
