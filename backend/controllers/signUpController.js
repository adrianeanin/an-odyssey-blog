const User = require("../models/user");
const { body, validationResult } = require("express-validator");
const { hashPassword } = require("../utils/encryption");

const signupUser = [
  body("name").trim().notEmpty().withMessage("Name cannot be empty").escape(),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email cannot be empty")
    .isEmail()
    .withMessage("Email isn't valid")
    .escape(),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password cannot be empty")
    .isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
    .withMessage(
      "Password must be at least 8 characters long and have at least " +
        "one lowercase and uppercase letter, a number and a symbol."
    )
    .escape(),
  async (req, res) => {
    const { name, email, password } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    // To allow only the admin to signup
    const existingUsers = await User.find();

    if (existingUsers.length > 0) {
      return res
        .status(403)
        .json({ error: "Signup not allowed. Admin user already exists." });
    }

    const hash = await hashPassword(password);
    const user = new User({ name, email, password: hash });
    const savedUser = await user.save();

    res.status(201).json(savedUser);
  },
];

module.exports = {
  signupUser,
};
