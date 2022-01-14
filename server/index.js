// Import express (NodeJS framework)
const express = require("express");
// Object modelling library for NodeJS
const mongoose = require("mongoose");
// dotenv file to hide environment variables
require("dotenv").config();
// AWS S3 file
const s3 = require("./s3.js");

const cors = require("cors");

// Import all our routes
const authRoute = require("./routes/auth");
const restaurantRoute = require("./routes/restaurants");
const reviewRoute = require("./routes/reviews");

// Initialize express and call the json() method to handle JSON data
const app = express();
app.use(express.json());
app.use(cors({ origin: "https://strongerapp.netlify.app" }));

// Connect to our MongoDB database
mongoose.connect(process.env.MONGO_CLUSTER);

app.use("/api/restaurants", restaurantRoute);
app.use("/api/auth", authRoute);
app.use("/api/reviews", reviewRoute);
app.get("/s3Url", async (req, res) => {
  const url = await s3.generateUploadURL();
  res.send({ url });
});

// Listen for when the server starts
app.listen(process.env.PORT || 5000, () => {
  console.log("Backend is running");
});
