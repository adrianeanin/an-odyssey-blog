const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const { comparePasswords } = require("../utils/encryption");
const config = require("../utils/config");

const loginUser = [
  body("email", "Name cannot be empty").trim().notEmpty().escape(),
  body("email", "Email cannot be empty").trim().notEmpty().escape(),
  body("password", "Password cannot be empty").trim().notEmpty().escape(),
  async (req, res) => {
    const { name, email, password } = req.body;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const user = await User.findOne({ email });
    const passwordCorrect =
      user === null ? false : await comparePasswords(password, user.password);

    if (!(user && passwordCorrect)) {
      return res.status(401).json({
        error: "invalid username or password",
      });
    }

    const userForToken = {
      name: user.name,
      email: user.email,
      id: user._id,
    };

    const token = jwt.sign(userForToken, config.SECRET, {
      expiresIn: "2h",
    });

    res.status(200).send({ name, email, token });
  },
];

module.exports = {
  loginUser,
};
