import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, Container, Form, InputGroup, Button } from "react-bootstrap";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "../../App.css";

import axios from "axios";

export default function RestaurantPage({ token }) {
  const { id } = useParams();
  const [rest, setRest] = useState({});
  const [reviews, setReviews] = useState([]);
  const [review, setReview] = useState([]);
  const [rating, setRating] = useState(0);

  useEffect(() => {
    axios
      .get(`https://jake-4ww3-project.herokuapp.com/api/restaurants/${id}`)
      .then((res) => {
        setRest(res.data);
        formatReviews(res.data.reviews);
      });
  }, []);

  const formatReviews = (reviews) => {
    const formattedReviews = reviews.map((reviewId) => {
      return `https://jake-4ww3-project.herokuapp.com/api/reviews/${reviewId}`;
    });
    Promise.all(formattedReviews.map((review) => axios.get(review))).then(
      (data) => setReviews(data)
    );
  };

  const handleReviewSubmission = (e) => {
    e.preventDefault();
    axios
      .post(
        "https://jake-4ww3-project.herokuapp.com/api/reviews",
        {
          text: review,
          rating,
          restId: id,
        },
        {
          headers: {
            "auth-token": token,
          },
        }
      )
      .then((res) => setReviews((reviews) => [...reviews, res]));
  };

  return (
    <React.Fragment>
      <Container>
        <Card>
          <Card.Img variant="top" src={rest.image} />
          <Card.Body>
            <Card.Title>{rest.name}</Card.Title>
            <Card.Text>{rest.description}</Card.Text>
          </Card.Body>
          <Card.Footer>
            {rest.location && (
              <small className="text-muted">
                Coordinates: ({rest.location.coordinates[0]},
                {rest.location.coordinates[1]})
              </small>
            )}
          </Card.Footer>
        </Card>
      </Container>
      <Container>
        {reviews.length > 0 &&
          reviews.map((review) => (
            <Card key={review.data._id}>
              <Card.Header>{review.data.rating}</Card.Header>
              <Card.Body>{review.data.text}</Card.Body>
            </Card>
          ))}
      </Container>
      <Container>
        {token ? (
          <Form onSubmit={handleReviewSubmission}>
            <Form.Group className="mb-3" controlId="formBasicReview">
              <Form.Label>Review</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter review"
                value={review}
                onChange={(e) => setReview(e.target.value)}
              />
            </Form.Group>
            <InputGroup className="mb-3">
              <Form.Select
                aria-label="Default select example"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
              >
                <option>Select a Rating</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </Form.Select>
            </InputGroup>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        ) : (
          <p>Please log in to leave a review</p>
        )}
      </Container>
      <Container>
        <MapContainer
          center={[43.64437547647877, -79.38664463335483]}
          zoom={13}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {rest.location && (
            <Marker
              position={[
                rest.location.coordinates[0],
                rest.location.coordinates[1],
              ]}
            >
              <Popup>
                <h6>
                  <a href={`/restaurant/${rest._id}`}>{rest.name}</a>
                  <p>{rest.description}</p>
                </h6>
              </Popup>
            </Marker>
          )}
        </MapContainer>
      </Container>
    </React.Fragment>
  );
}
