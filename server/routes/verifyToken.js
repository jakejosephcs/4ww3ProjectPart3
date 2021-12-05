// Using JSON Web tokens (JWT) to protect routes
const jwt = require("jsonwebtoken");

// Middleware
module.exports = function (req, res, next) {
  // Get the token from the response header with the key "auth-token"
  const token = req.header("auth-token");
  // If there is no token then we deny access to the route
  if (!token) res.status(401).send("Access denied");

  try {
    // Verfiy that the token is one that we created
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    // Attach the user id that we get from verfiying the token
    req.user = verified;
    // Call next() to continute the request
    next();
  } catch (err) {
    // If token id invalid we send a 400 response
    res.status(400).send("Invalid token");
  }
};
