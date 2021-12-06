import React, { useState } from "react";
import {
  Button,
  Form,
  Container,
  Toast,
  ToastContainer,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function SubmissionPage({ token }) {
  const [name, setName] = useState("");
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorStatus, setErrorStatus] = useState("");

  let navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const { url } = await fetch(
      "https://jake-4ww3-project-part-3.herokuapp.com/s3Url"
    )
      .then((res) => res.json())
      .catch((err) => console.log(err));

    await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: image,
    });

    const imageUrl = url.split("?")[0];

    axios
      .post(
        "https://jake-4ww3-project-part-3.herokuapp.com/api/restaurants/",
        {
          name,
          location: [latitude, longitude],
          description,
          image: imageUrl,
        },
        {
          headers: {
            "auth-token": token,
          },
        }
      )
      .then((res) => {
        console.log(res);
        navigate({ pathname: "/" });
      })
      .catch((err) => {
        setIsError(true);
        err.response && setErrorMessage(err.response.data);
        err.response && setErrorStatus(err.response.status);
        navigate({ pathname: "/" });
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
      {token ? (
        <Form onSubmit={handleFormSubmit}>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Location</Form.Label>
            <Form.Control
              type="number"
              aria-label="latitude"
              placeholder="Enter Latitude"
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
            />
            <Form.Control
              type="number"
              aria-label="longitude"
              placeholder="Enter Longitude"
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Upload and image</Form.Label>
            <Form.Control
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      ) : (
        <h1>Please log in OR sign up to add a new resto</h1>
      )}
    </Container>
  );
}
