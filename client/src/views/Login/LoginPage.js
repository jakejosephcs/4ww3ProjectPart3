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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorStatus, setErrorStatus] = useState("");

  let navigate = useNavigate();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://jake-4ww3-project.herokuapp.com/api/auth/login", {
        email,
        password,
      })
      .then((res) => {
        console.log(res);
        localStorage.setItem("token", res.data.token);
        setToken(res.data.token);
        navigate({ pathname: "/" });
      })
      .catch((err) => {
        setIsError(true);
        err.response && setErrorMessage(err.response.data);
        err.response && setErrorStatus(err.response.status);
      });
  };
  return (
    <Container>
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
