import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../../App.css";
import { Container, Divider, Chip } from "@mui/material";

import RestaurantCard from "../../components/RestaurantCard.js";
import RestaurantReviews from "../../components/RestaurantReviews.js";
import RestaurantSubmission from "../../components/RestaurantSubmission.js";
import MapResults from "../../components/MapResults.js";

import axios from "axios";

export default function RestaurantPage({ token }) {
  // Grab the object id from the url
  const { id } = useParams();
  // State used to set the resto, the reviews, the review and the rating
  const [rest, setRest] = useState({});
  const [reviews, setReviews] = useState([]);
  const [review, setReview] = useState([]);
  const [rating, setRating] = useState(0);

  // Fired on page load to grab the object with the given id in the url
  useEffect(() => {
    axios.get(`http://localhost:5000/api/restaurants/${id}`).then((res) => {
      setRest(res.data);
      formatReviews(res.data.reviews);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Formats reviews by making a call to the reviews end point to get all reviews for a certain restaurant
  const formatReviews = (reviews) => {
    const formattedReviews = reviews.map((reviewId) => {
      return `http://localhost:5000/api/reviews/${reviewId}`;
    });
    Promise.all(formattedReviews.map((review) => axios.get(review))).then(
      (data) => setReviews(data)
    );
  };

  // Fire when a user submits a new review
  const handleReviewSubmission = (e) => {
    e.preventDefault();
    // Makes a post request to the reviews end point and then updates the page WITHOUT reload
    axios
      .post(
        "http://localhost:5000/api/reviews",
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
      .then((res) => {
        setReviews((reviews) => [...reviews, res]);
        setReview(" ");
        setRating(0);
      });
  };

  return (
    <Container maxWidth="md">
      <Divider sx={{ marginY: 3 }}>
        <Chip label={`${rest && rest.name}`} />
      </Divider>
      <RestaurantCard rest={rest} reviews={reviews} />
      <Divider sx={{ marginY: 3 }}>
        <Chip label={`Reviews for ${rest && rest.name}`} />
      </Divider>
      <RestaurantReviews reviews={reviews} />
      {token && (
        <RestaurantSubmission
          handleReviewSubmission={handleReviewSubmission}
          review={review}
          setReview={setReview}
          rating={setRating}
          setRating={setRating}
        />
      )}
      <Divider sx={{ marginY: 3 }}>
        <Chip label={`Location of ${rest && rest.name}`} />
      </Divider>
      <MapResults rest={rest} />
    </Container>
  );
}
