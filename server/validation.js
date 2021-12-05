// Responsible for server-side validation

// Schema description language and data validator for JavaScript
const Joi = require("joi");

// Validates the user when they are registering on the Sign Up page
const registerValidation = (userObject) => {
  const schema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    // Requires the string value to be a valid email address.
    email: Joi.string().email().required(),
    // Password must be between 3 and 30 characters long
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
    gender: Joi.string(),
  });

  return schema.validate(userObject);
};

// Validates the user when they are logging in on the Log In page
const loginValidation = (userObject) => {
  const schema = Joi.object({
    // Requires the string value to be a valid email address.
    email: Joi.string().email().required(),
    // Password must be between 3 and 30 characters long
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  });

  return schema.validate(userObject);
};

// Validates the object when the logged in user is submitting a new object
const objectValidation = (object) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    // Requires the location to be an array of length 2 of numbers
    location: Joi.array().items(Joi.number().required()).length(2),
    description: Joi.string().required(),
    image: Joi.string().required(),
  });

  return schema.validate(object);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.objectValidation = objectValidation;
