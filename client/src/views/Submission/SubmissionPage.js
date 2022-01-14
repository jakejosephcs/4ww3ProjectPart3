import React, { useState } from "react";
// import {
//   Button,
//   Form,
//   Container,
//   Toast,
//   ToastContainer,
// } from "react-bootstrap";
import {
  Container,
  TextField,
  Button,
  Box,
  Divider,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import { useNavigate } from "react-router-dom";
import axios from "axios";

const Input = styled("input")({
  display: "none",
});

export default function SubmissionPage({ token }) {
  // State used to store the user's info
  const [name, setName] = useState("");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  // State for any errors
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorStatus, setErrorStatus] = useState("");

  // Used to redirect
  let navigate = useNavigate();

  // Fires when we submit
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Makes a get request to the AWS S3 bucket for the image url
    const { url } = await fetch(
      "https://jake-4ww3-project-part-3.herokuapp.com/s3Url"
    )
      .then((res) => res.json())
      .catch((err) => console.log(err));

    // Puts the image into our AWS S3 bucket
    await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: image,
    });

    // Grabs the image url from the url response
    const imageUrl = url.split("?")[0];

    // Add the new object (with the image url) to the MongoDB database
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

  if (!token) {
    return (
      <Typography
        variant="h6"
        sx={{ display: "flex", justifyContent: "center" }}
      >
        Please log in to view this page
      </Typography>
    );
  }

  return (
    <Container
      maxWidth="md"
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography variant="h6">Add a Restaurant</Typography>
      <Box sx={{ marginBottom: 1, padding: 1 }}>
        <TextField
          id="filled-basic"
          label="Restaurant Name"
          variant="filled"
          sx={{ width: "100%" }}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Box>
      <Divider light />
      <Box sx={{ marginBottom: 1, padding: 1 }}>
        <TextField
          id="filled-basic"
          label="Restaurant Description"
          variant="filled"
          sx={{ width: "100%" }}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Box>
      <Divider light />
      <Box sx={{ marginBottom: 1, padding: 1 }}>
        <TextField
          id="filled-basic"
          label="Latitude"
          variant="filled"
          sx={{ width: "100%", marginBottom: 2 }}
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
        />
        <TextField
          id="filled-basic"
          label="Longitude"
          variant="filled"
          sx={{ width: "100%" }}
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
        />
      </Box>
      <Divider light />
      <Box
        sx={{
          marginBottom: 3,
          padding: 1,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <label htmlFor="contained-button-file">
          <Input
            accept="image/*"
            id="contained-button-file"
            multiple
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            required
          />
          <Button
            variant={`${!image ? "outlined" : "contained"}`}
            component="span"
          >
            {!image ? "Upload an Image" : "Uploaded"}
          </Button>
        </label>
      </Box>
      <Button variant="contained" onClick={handleFormSubmit}>
        Add Restaurant
      </Button>
    </Container>
  );
}
