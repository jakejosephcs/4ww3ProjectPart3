// Router to route all our requests
const router = require("express").Router();
const Restaurant = require("../models/Restaurant");
// Review model used to perform operations on the Review document inside MongoDB
const Review = require("../models/Review");
// User model used to perform operations on the User document inside MongoDB
const User = require("../models/User");
// JWT middleware to protect certain routes
const verify = require("./verifyToken");

// Create a review for a restaurant
// Only logged in user's (with a valid JWT) can submit new reviews
router.post("/", verify, async (req, res) => {
  // Grab the user id from the JWT token and the rest from the request body
  const userId = req.user._id;
  const { text, rating, restId } = req.body;

  // Create a new review with the provided information
  const newReview = new Review({
    text,
    rating,
    user: userId,
    restaurant: restId,
  });

  try {
    //  Save the newly created review
    const savedReview = await newReview.save();

    // Find the restaurant that the review is for (based on the rest's id)
    const rest = await Restaurant.findById(restId);
    // Push the new review to the rest's review object id array
    rest.reviews.push(savedReview);
    // Push the new rating to the rest's rating integer array
    rest.rating.push(rating);
    // Save the new data in our MongoDB database
    await rest.save();

    // Find the user that the review is for (based on the user's id)
    const user = await User.findById(userId);
    // Push the new review to the user's review object id array
    user.reviews.push(savedReview);
    // Save the new data in our MongoDB database
    await user.save();

    // Send the newly created review as a response with status code 200 OK
    res.status(200).json(savedReview);
  } catch (err) {
    // Throw a 500 Server error if something goes wrong
    res.status(500).json(err);
  }
});

// Get a review based on the review id
router.get("/:id", async (req, res) => {
  // Get the rest id from the request parameters
  const id = req.params.id;
  try {
    // Find the review based on the review id
    const review = await Review.findById(id);
    // Return a status code 200 OK and the review object in the response
    res.status(200).json(review);
  } catch (err) {
    // Throw a 500 Server error if something goes wrong
    res.status(500).json(err);
  }
});

module.exports = router;
