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
}) {
  const [rest, setRest] = useState([]);
  const [lat, setLat] = useState(0);
  const [long, setLong] = useState(0);

  let navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://jake-4ww3-project-part-3.herokuapp.com/api/restaurants/")
      .then(({ data }) => setRest(data));
  }, []);

  const handleSearchByQuery = (e) => {
    e.preventDefault();
    setSearchBy("query");
    navigate({ pathname: "/results" });
  };

  const handleSearchByRating = (e) => {
    e.preventDefault();
    setSearchBy("rating");
    navigate({ pathname: "/results" });
  };

  const handleSearchByLocation = (e) => {};

  const handleGetLocation = (e) => {
    e.preventDefault();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showLocation);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  function showLocation(position) {
    setLat(position.coords.latitude);
    setLong(position.coords.longitude);
  }

  return (
    <div>
      <Container fluid>
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
