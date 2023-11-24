const express = require("express");
require("express-async-errors");
require("dotenv").config();
const app = express();
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const config = require("./utils/config");
const logger = require("./utils/logger");
const blogRouter = require("./routes/blogs");

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
app.use("/api/blogs", blogRouter);

// Routes

module.exports = app;
