import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Container } from "react-bootstrap";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "../../App.css";

export default function ResultsPage({
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

  // Renders the page using React Bootstrap
  return (
    <Container>
      <h2>Results for {query}</h2>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Location</th>
            <th>Rating</th>
          </tr>
        </thead>
        <tbody>
          {rest &&
            rest.map((r) => {
              return (
                <tr>
                  <td>
                    <a href={`/restaurant/${r._id}`}>{r.name}</a>
                  </td>
                  <td>{r.description}</td>
                  <td>
                    [{r.location.coordinates[0]}, {r.location.coordinates[1]}]
                  </td>
                  <td>{r.rating} / 5</td>
                </tr>
              );
            })}
        </tbody>
      </Table>
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
          {rest &&
            rest.map((r) => (
              <Marker
                position={[
                  r.location.coordinates[0],
                  r.location.coordinates[1],
                ]}
              >
                <Popup>
                  <h6>
                    <a href={`/restaurant/${r._id}`}>{r.name}</a>
                    <p>{r.description}</p>
                  </h6>
                </Popup>
              </Marker>
            ))}
        </MapContainer>
      </Container>
    </Container>
  );
}
