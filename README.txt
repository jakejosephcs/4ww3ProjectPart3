PLEASE NOTE: Project was submitted one day late. The Professor granted only a 5% penatly and NOT 20%
Name: Jake Joseph
Student Number: 1423566
Githib Repo: https://github.com/jakejosephcs/4ww3ProjectPart3
Live Website: https://4ww3-project-jake.netlify.app/

This application was created using the MERN stack (with approval from the Professor):
- MongoDB as the document database
- Express as the NodeJS framework
- React to handle all the front end logic
- Nodejs to handle all the server size logic

The application will be split up into two components:
1. The server
2. The client

SERVER:
In the models folder, we are describing the structure of "tables" (documents in MongoDB). This consists of:
- Restaurant "table"
- Review "table"
- User "table"
In the routes folder, we are handling how requests of different types and url's are handled
- auth.js handles user registration and login
- restaurant.js handles all restaurant requests
- reviews.js handles all review requests
- verifyToken.js uses JWT to ensure that a logged in user can create an Object and add a Review
All senitive data is stored inside .env
The server side logic begins in index.js
The s3.js file handles all server side logic for AWS S3 image upload
The validation.js file is used for server side validation

CLIENT:
The client side is created using React
The src folder is where all the client side logic resides
The components folder contains reusable components 
The views folder contains the pages that the user will server
All logic begins inside the App.js file
The index.js file is where we append the logic to the DOM
The CSS is handled using react bootstrap

Add-on 3: React (instead of AJAX)
The submitted reviews are automatically appened to the page without reload using React.
React only updates parts of the DOM that have changed and therefore, does not reload the page.