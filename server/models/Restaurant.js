// Object modelling library for NodeJS
const mongoose = require("mongoose");

// Used for location based search (https://medium.com/@oshanm1/how-to-find-nearby-locations-within-a-radius-using-mongodb-bbb5f57005f1)
const geoSchema = new mongoose.Schema({
  type: {
    type: String,
    default: "Point",
  },
  coordinates: {
    type: [Number],
  },
});

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
    type: geoSchema,
    index: "2dsphere",
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
