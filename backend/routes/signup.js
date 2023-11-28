const express = require("express");
const router = express.Router();

const { signupUser } = require("../controllers/signUpController");

router.post("/signup", signupUser);

module.exports = router;
