// Object modelling library for NodeJS
const mongoose = require("mongoose");

// Describes the document structure of the Restaurant object (akin to a table in SQL)
// A Restaruant can have a (some required some not):
// 1. Name
// 2. Location (coordinates)
// 3. Description
// 4. Image (url)
// 5. Ratings (represented as an array of integers)
// 6. Reviews (represented as an array of Review Object Id's)
// 7. User (represented as a User Object Id)
const RestaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ["Point"], // 'location.type' must be 'Point'
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  rating: [
    {
      type: Number,
    },
  ],
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Restaurant", RestaurantSchema);
