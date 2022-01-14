import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Form,
  Container,
  Toast,
  ToastContainer,
} from "react-bootstrap";
import axios from "axios";

export default function LoginPage({ setToken }) {
  // State holds the input entered by the user
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // State to determine if there is an error and it's status
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorStatus, setErrorStatus] = useState("");

  // Used to naviagte to a new page
  let navigate = useNavigate();

  // Fires when we hit the login button
  const handleFormSubmit = (e) => {
    // Prevent page reload (default bahviour)
    e.preventDefault();
    // Make a post request to the auth/login route
    axios
      .post("http://localhost:5000/api/auth/login", {
        email,
        password,
      })
      .then((res) => {
        console.log(res);
        // Store the user's JWT token inside local storage (used to validate if user has access to routes)
        localStorage.setItem("token", res.data.token);
        setToken(res.data.token);
        // Redirect to home page
        navigate({ pathname: "/" });
      })
      .catch((err) => {
        // Set error msg if an error is thrown
        setIsError(true);
        err.response && setErrorMessage(err.response.data);
        err.response && setErrorStatus(err.response.status);
      });
  };
  // Renders the page using React Bootstrap
  return (
    <Container>
      <h3>Log in:</h3>
      {isError && (
        <ToastContainer position="top-end" className="p-3">
          <Toast>
            <Toast.Header
              onClick={() => {
                setIsError(false);
                setErrorMessage("");
              }}
            >
              <img
                src="holder.js/20x20?text=%20"
                className="rounded me-2"
                alt=""
              />
              <strong className="me-auto">Error code: {errorStatus}</strong>
              <small></small>
            </Toast.Header>
            <Toast.Body>{errorMessage}</Toast.Body>
          </Toast>
        </ToastContainer>
      )}
      <Form onSubmit={handleFormSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
}
