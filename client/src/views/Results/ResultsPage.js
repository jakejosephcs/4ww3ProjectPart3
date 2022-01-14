import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../App.css";

import { Container, Divider, Chip } from "@mui/material";

import ResultsTable from "../../components/ResultsTable.js";
import MapResults from "../../components/MapResults.js";

export default function ResultsPage({
  query,
  quertyRating,
  searchBy,
  lat,
  long,
}) {
  // Stores the resto to display
  const [rest, setRest] = useState([]);

  // On page load, we check what we searched by (query, rating or location)
  useEffect(() => {
    if (searchBy === "query" || searchBy === "rating") {
      axios
        .get("https://jake-4ww3-project-part-3.herokuapp.com/api/restaurants")
        .then((res) => {
          if (searchBy === "query") {
            setRest(filterByQuery(res.data));
          } else if (searchBy === "rating") {
            setRest(filterByRating(res.data));
          }
        });
    } else {
      axios
        .post(
          "https://jake-4ww3-project-part-3.herokuapp.com/api/restaurants/byArea",
          {
            lat: lat,
            lng: long,
          }
        )
        .then(({ data }) => setRest(data))
        .catch((e) => console.log(e));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Filter all reso by name (if they include the query in them)
  const filterByQuery = (rest) => {
    return rest.filter(
      (r) => r.name.toLowerCase().includes(query.toLowerCase()) && r
    );
  };

  // Filter reso by their rating (takes the avg of all rating array that each resto has)
  const filterByRating = (rest) => {
    const restWithAvgRating = rest.map((r) => {
      const ratingSum = r.rating.reduce((a, b) => a + b, 0);
      const ratingAvg = Math.round(ratingSum / r.rating.length) || 0;
      return { ...r, rating: ratingAvg };
    });

    return restWithAvgRating.filter((r) => r.rating === parseInt(quertyRating));
  };

  return (
    <Container maxWidth="md">
      <Divider sx={{ marginY: 3 }}>
        <Chip label={`Results for ${query}`} />
      </Divider>
      <ResultsTable rest={rest} />
      <Divider sx={{ marginY: 3 }}>
        <Chip label={`Map for ${query}`} />
      </Divider>
      <MapResults rest={rest} />
    </Container>
  );
}
