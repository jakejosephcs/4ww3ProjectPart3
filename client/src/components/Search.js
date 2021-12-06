import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  InputGroup,
  FormControl,
  Button,
  Form,
  Row,
  Col,
  Card,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../App.css";

export default function Search({
  query,
  setQuery,
  quertyRating,
  setQueryRating,
  searchBy,
  setSearchBy,
  lat,
  long,
  setLat,
  setLong,
}) {
  const [rest, setRest] = useState([]);

  let navigate = useNavigate();

  // When the page loads, we grab all restaurants that are in our MongoDB database
  useEffect(() => {
    axios
      .get("https://jake-4ww3-project-part-3.herokuapp.com/api/restaurants/")
      .then(({ data }) => setRest(data));
  }, []);

  // Update the search term to "query" and redirect user to the results page
  const handleSearchByQuery = (e) => {
    e.preventDefault();
    setSearchBy("query");
    navigate({ pathname: "/results" });
  };

  // Update the search term to "rating" and redirect user to the results page
  const handleSearchByRating = (e) => {
    e.preventDefault();
    setSearchBy("rating");
    navigate({ pathname: "/results" });
  };

  // Update the search term to "location" and redirect user to the results page
  const handleSearchByLocation = (e) => {
    e.preventDefault();
    setSearchBy("location");
    navigate({ pathname: "/results" });
  };

  // Calls the get location method inside the navigator class
  const handleGetLocation = (e) => {
    e.preventDefault();
    // If the location is supported
    if (navigator.geolocation) {
      // Fire the callback function showLocation when the user's location is approved
      navigator.geolocation.getCurrentPosition(showLocation);
    } else {
      // If the location API is not supported, then alert the user
      alert("Geolocation is not supported by this browser.");
    }
  };

  // Call back function that is passed into the getCurrentPosition method above.
  // Updates the values of both Latitide and Logitude with the user's coordinates
  function showLocation(position) {
    setLat(position.coords.latitude);
    setLong(position.coords.longitude);
  }

  // Renders the page using React Bootstrap
  return (
    <div>
      <Container fluid>
        {/* Search by various ways (query, rating, location) */}
        <InputGroup className="mb-3">
          <FormControl
            placeholder="Reastaurant Name e.g., Baro"
            aria-label="Reastaurant name"
            aria-describedby="basic-addon2"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Button
            variant="outline-secondary"
            id="button-addon2"
            onClick={handleSearchByQuery}
          >
            Search by Reastaurant Name
          </Button>
        </InputGroup>
        <InputGroup className="mb-3">
          <Form.Select
            aria-label="Default select example"
            value={quertyRating}
            onChange={(e) => setQueryRating(e.target.value)}
          >
            <option>Select a Rating</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </Form.Select>
          <Button
            variant="outline-secondary"
            id="button-addon2"
            onClick={handleSearchByRating}
          >
            Search by Reastaurant Rating
          </Button>
        </InputGroup>
        <InputGroup className="mb-3">
          <Button variant="outline-secondary" onClick={handleGetLocation}>
            Get my Location
          </Button>
          <FormControl
            aria-label="Latitude entry"
            placeholder="Latitude"
            value={lat}
            onChange={(e) => setLat(e.target.value)}
          />
          <FormControl
            aria-label="Longitude entry"
            placeholder="Longitude"
            value={long}
            onChange={(e) => setLong(e.target.value)}
          />
          <Button variant="outline-secondary" onClick={handleSearchByLocation}>
            Search by Location
          </Button>
        </InputGroup>
      </Container>
      <Container>
        {/* Display all restaurants in DB */}
        <h3>All Restaurants:</h3>
      </Container>
      <Container>
        <Row xs={1} md={2} className="g-4">
          {rest.map((_, idx) => (
            <Col>
              <Card>
                <Card.Img variant="top" src={_.image} />
                <Card.Body>
                  <Card.Title>
                    <a href={`/restaurant/${_._id}`}>{_.name}</a>
                  </Card.Title>
                  <Card.Text>{_.description}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}
