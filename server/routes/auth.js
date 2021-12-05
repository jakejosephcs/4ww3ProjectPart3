// Router to route all our requests
const router = require("express").Router();
// User model used to perform operations on the User document inside MongoDB
const User = require("../models/User");
// Server side validation for user login and register
const { registerValidation, loginValidation } = require("../validation");
// Used to Hash Password so that we are not storing it as plain text
const bcrypt = require("bcrypt");
// Token based Authentication using JWT
var jwt = require("jsonwebtoken");
// Use environment variables to hide sensitive information
require("dotenv").config();

// REGISTER - handles all post requests made to ".../register"
router.post("/register", async (req, res) => {
  // Server side validation
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Getting the user information passed to the request body
  const { firstName, lastName, email, password, gender } = req.body;

  // Checking if the user's email is already in the database
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("Email already exists");

  // No errors so we can go ahead and try creating the user in our database
  try {
    // Generate hashed password (using bcrypt)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = new User({
      firstName,
      lastName,
      email,
      gender,
      password: hashedPassword,
    });

    // Save the user to the database and send response
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    // Server error if the try block fails
    res.status(500).json(err);
  }
});

// LOGIN - handles all post requests made to ".../login"
router.post("/login", async (req, res) => {
  // Server side validation
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // No errors so we can go ahead and try finding the user in our database
  try {
    // Finding the user in our database based on their email
    const user = await User.findOne({ email: req.body.email });
    // Throw an error if the user is not in our database
    if (!user) {
      res.status(400).json("Wrong credentials");
    }

    // User exists so we must validate the password now (using bcrypt)
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    // Throw an error if the password is incorrect
    if (!validPassword) {
      res.status(400).json("wrong credentials");
    }

    // // Create and assign a token
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    res.header("auth-token", token).send({ token });
  } catch (err) {
    // Server error if the try block fails
    res.status(500).json(err);
  }
});

module.exports = router;
