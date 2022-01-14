import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import SearchOptions from "./SearchOptions";
import Restaurants from "./Restaurants";
import { Divider, Chip, Container } from "@mui/material";

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

  return (
    <Container maxWidth="md">
      <Divider sx={{ marginY: 3 }}>
        <Chip label="Search a Restaurant" />
      </Divider>
      <SearchOptions
        query={query}
        setQuery={setQuery}
        quertyRating={quertyRating}
        setQueryRating={setQueryRating}
        lat={lat}
        long={long}
        setLat={setLat}
        setLong={setLong}
        handleSearchByQuery={handleSearchByQuery}
        handleSearchByRating={handleSearchByRating}
        handleGetLocation={handleGetLocation}
        handleSearchByLocation={handleSearchByLocation}
      />
      <Divider sx={{ marginTop: 3 }}>
        <Chip label="All Restaurant" />
      </Divider>
      <Restaurants rest={rest} setRest={setRest} />
    </Container>
  );
}
