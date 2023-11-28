require("dotenv").config();

const PORT = 3003;
const MONGODB_URI =
  process.env.NODE_ENV === "development"
    ? process.env.DEV_MONGODB_URI
    : process.env.MONGODB_URI;

const SECRET = process.env.SECRET;

module.exports = {
  MONGODB_URI,
  PORT,
  SECRET,
};
