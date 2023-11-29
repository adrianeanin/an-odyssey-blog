const express = require("express");
require("express-async-errors");
require("dotenv").config();
const app = express();
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const config = require("./utils/config");
const logger = require("./utils/logger");
const blogRouter = require("./routes/blogs");
const signUpRouter = require("./routes/signup");
const loginRouter = require("./routes/login");
const commentRouter = require("./routes/comments");
const middleware = require("./utils/middleware");

// Mongo DB Connection
mongoose.set("strictQuery", false);
logger.info("connecting to", config.MONGODB_URI);

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info("connected to MongoDB");
  })
  .catch((error) => {
    logger.error("error connecting to MongoDB:", error.message);
  });

// Middleware Connections
app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);
app.use(middleware.tokenExtractor);
app.use(middleware.userExtractor);

// Routes
app.use("/api/blog", blogRouter, commentRouter);
app.use("/api/users", signUpRouter, loginRouter);

// Error handling middleware
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
