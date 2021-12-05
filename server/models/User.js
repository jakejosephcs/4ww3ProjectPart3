// Object modelling library for NodeJS
const mongoose = require("mongoose");

// Describes the document structure of the User object (akin to a table in SQL)
// A Restaruant can have a (some required some not):
// 1. firstName
// 2. lastName
// 3. email (must be unique)
// 4. password (must be between 3 and 30 characters long)
// 5. gender
// 6. reviews that belong to the user (represented as an array of Review Object Id's)
// 6. restaurants that belong to the user (represented as an array of Restaurant Object Id's)
const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  restaurants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      red: "Restaurant",
    },
  ],
});

module.exports = mongoose.model("User", UserSchema);
