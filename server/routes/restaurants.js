// Router to route all our requests
const router = require("express").Router();
// Restaurant model used to perform operations on the Restaurant document inside MongoDB
const Restaurant = require("../models/Restaurant");
// User model used to perform operations on the User document inside MongoDB
const User = require("../models/User");
// JWT middleware to protect certain routes
const verify = require("./verifyToken");
// Server side validation for the create of new Restaurants
const { objectValidation } = require("../validation");

// Create a new Restaurant and update the User's restaurant array
// Only logged in user's (with a valid JWT) can add new objects
router.post("/", verify, async (req, res) => {
  // Server side validation
  const { error } = objectValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Grab the user id from the JWT token and the rest from the request body
  const userId = req.user._id;
  const { name, location, description, image } = req.body;

  // Create a new retaurant with the provided information
  const newRestaurant = new Restaurant({
    name,
    location: {
      type: "Point",
      coordinates: [location[0], location[1]],
    },
    description,
    user: userId,
    image,
  });

  // Async tasks are wrapped inside a try/catch block
  try {
    //  Save the newly created restaurant
    const savedRestaurant = await newRestaurant.save();

    // Find the user who created this new restaurant (based on the user's id)
    const user = await User.findById(userId);
    // Push the new restaurant to the user's restaurant object id array
    user.restaurants.push(savedRestaurant);
    // Save the new data in our MongoDB database
    await user.save();

    // Send the newly created restaurant as a response with status code 200 OK
    res.status(200).json(savedRestaurant);
  } catch (err) {
    // Throw a 500 Server error if something goes wrong
    res.status(500).json(err);
  }
});

// Get a restarant based on the restaurant id:
router.get("/:id", async (req, res) => {
  // Get the rest id from the request parameters
  const restId = req.params.id;
  try {
    // Find the rest based on the restId
    const rest = await Restaurant.findById(restId);
    // Return a status code 200 OK and the rest object in the response
    res.status(200).json(rest);
  } catch (err) {
    // Throw a 500 Server error if something goes wrong
    res.status(500).json(err);
  }
});

// Get all restaurants
router.get("/", async (req, res) => {
  try {
    // Get all rest into our MongoDB database
    const rest = await Restaurant.find();
    // Return a status code 200 OK and all the restaurants
    res.status(200).json(rest);
  } catch (err) {
    // Throw a 500 Server error if something goes wrong
    res.status(500).json(err);
  }
});

module.exports = router;
