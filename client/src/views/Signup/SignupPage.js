import React, { useState } from "react";
import {
  Button,
  Form,
  Container,
  Toast,
  ToastContainer,
} from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function SignupPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");

  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorStatus, setErrorStatus] = useState("");

  let navigate = useNavigate();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        "https://jake-4ww3-project-part-3.herokuapp.com/api/auth/register",
        {
          firstName,
          lastName,
          email,
          password,
          gender,
        }
      )
      .then((res) => {
        console.log(res);
        setIsError(false);
        setErrorMessage("");
        setErrorStatus("");
        navigate({ pathname: "/signin" });
      })
      .catch((err) => {
        setIsError(true);
        err.response && setErrorMessage(err.response.data);
        err.response && setErrorStatus(err.response.status);
      });
  };

  return (
    <Container>
      <h3>Sign up:</h3>
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
        <Form.Group className="mb-3" controlId="formBasicFirstName">
          <Form.Label>First name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter first name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicLastName">
          <Form.Label>Last name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </Form.Group>
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
        <Form.Select
          aria-label="Default select example"
          className="mb-3"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        >
          <option>Gender</option>
          <option value="M">Male</option>
          <option value="F">Female</option>
          <option value="O">Other</option>
        </Form.Select>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
}
