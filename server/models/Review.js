// Object modelling library for NodeJS
const mongoose = require("mongoose");

// Describes the document structure of the Review object (akin to a table in SQL)
// A Review can have a (some required some not):
// 1. Text
// 2. Rating (minimum 1 star or maximum 5 stars)
// 3. User leaving the review (represented as a User Object Id)
// 4. Restaurant the review is for (represented as a Restuarant Object Id)
const ReviewSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
  },
});

module.exports = mongoose.model("Review", ReviewSchema);
