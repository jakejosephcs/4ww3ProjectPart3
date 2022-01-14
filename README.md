
# Top Eats - [__try it out__](https://topeats.netlify.app/)

Full stack web application that allows anyone to track their weightlifting workouts in the gym.

## Features
- A search form that allows users to search for restaurants by: name, rating or location
- Ability to submit new restaurants (name, description, location) with an image (stored in AWS S3)
- Abillity to submit reviews (rating and text) to a restaurant
- Protected routes using Firebase and JWT
- Dynamically generated restaurant page

## Tech Stack

**Client:** React, MaterialUI

**Server:** Node, Express, Firebase

**Database:** MongoDB, AWS S3

**Deployment:** Heroku, Netlify

## Packages

| Name                                                          | Usuage                                                 | Client or Server  |
| ------------------------------------------------------------- | ------------------------------------------------------ | ----------------- |
| [axios](https://www.npmjs.com/package/axios)                  | Making HTTP requests from node.js                      |  Client           |
| [react-dom](https://www.npmjs.com/package/react-dom)          | Interacting with the DOM with React                    |  Client           |
| [react-router-dom](https://reactrouter.com/)                  | Routing for React                                      |  Client           |
| [react-leaflet](https://react-leaflet.js.org)                   | Used to add restaurants to a map                       |  Client           |
| [aws-sdk](https://www.npmjs.com/package/aws-sdk)              | Used to interact with AWS S3                           |  Client / Server  |
| [nodemon](https://www.npmjs.com/package/nodemon)              | Restarting the server on save                          |  Server           |
| [bcrypt](https://www.npmjs.com/package/bcrypt)                | Hashing the user's password for storage in MongoDB     |  Server           |
| [cors](https://www.npmjs.com/package/cors)                    | Enable requesting resources from server via client     |  Server           |
| [dotenv](https://www.npmjs.com/package/dotenv)                | Environment variables                                  |  Server           |
| [express](https://www.npmjs.com/package/express)              | Web framework for node                                 |  Server           |
| [joi](https://www.npmjs.com/package/joi)                      | Server side validation                                 |  Server           |
| [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)    | JWT authentication and authorization                   |  Server           |
| [mongoose](https://www.npmjs.com/package/mongoose)            | Handle modelling application data and querying MongoDB |  Server           |

