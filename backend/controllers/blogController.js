const Blog = require("../models/blog");
const mongoose = require("mongoose");
require("express-async-errors");
const { body, validationResult } = require("express-validator");

const getPosts = async (req, res) => {
  const posts = await Blog.find({}).populate("user", { name: 1 });
  res.status(200).json(posts);
};

const getPublishedPosts = async (req, res) => {
  const posts = await Blog.find({ isPublished: true }).sort({ createdAt: -1 });

  res.status(200).json(posts);
};

const getPost = async (req, res) => {
  const { id } = req.params;

  const post = await Blog.findById(id);

  if (!mongoose.Types.ObjectId.isValid(id) || !post) {
    return res.status(404).json({ error: "No such post" });
  }

  res.status(200).json(post);
};

const createPost = [
  body("title").trim().notEmpty().withMessage("Title is required"),
  body("subTitle").trim().notEmpty().withMessage("Snippet is required"),
  body("body").trim().notEmpty().withMessage("Body is required"),
  body("tags").trim(),
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    const { title, subTitle, body, quote, tags, isPublished } = req.body;
    const user = req.user;
    const author = user.name;

    const post = await Blog.create({
      title,
      subTitle,
      body,
      quote,
      isPublished,
      tags,
      author,
    });

    const savedPost = await post.save();

    user.blogs = user.blogs.concat(savedPost._id);
    await user.save();

    res.status(201).json(savedPost);
  },
];

const updatePost = [
  body("title").trim().notEmpty().withMessage("Title is required"),
  body("subTitle").trim().notEmpty().withMessage("Snippet is required"),
  body("body").trim().notEmpty().withMessage("Body is required"),
  body("tags").trim(),
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "No such post" });
    }

    const updatedPost = await Blog.findByIdAndUpdate(id, { ...req.body });

    res.status(201).json(updatedPost);
  },
];

const deletePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such post" });
  }

  await Blog.findByIdAndDelete(id);

  res.status(204).end();
};

module.exports = {
  getPosts,
  getPublishedPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
};
