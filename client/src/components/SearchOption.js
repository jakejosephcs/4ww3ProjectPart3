import * as React from "react";
import {
  FormControl,
  InputLabel,
  Input,
  Button,
  Box,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";

export default function BasicTextFields({
  type,
  query,
  setQuery,
  quertyRating,
  setQueryRating,
  lat,
  long,
  setLat,
  setLong,
  handleSearchByQuery,
  handleSearchByRating,
  handleGetLocation,
  handleSearchByLocation,
}) {
  if (type === "query") {
    return (
      <FormControl
        sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <Box>
          <InputLabel htmlFor="my-input">Restaurant Name</InputLabel>
          <Input
            id="my-input"
            aria-describedby="my-helper-text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </Box>
        <Box sx={{ marginLeft: "1rem" }}>
          <Button variant="outlined" onClick={handleSearchByQuery}>
            Search
          </Button>
        </Box>
      </FormControl>
    );
  }

  if (type === "rating") {
    return (
      <FormControl
        sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <Box sx={{ minWidth: 200 }}>
          <InputLabel id="demo-simple-select-label">Select a Rating</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={quertyRating}
            label="Select a Rating"
            onChange={(e) => setQueryRating(e.target.value)}
            sx={{ minWidth: 200 }}
          >
            <MenuItem value={1}>One</MenuItem>
            <MenuItem value={2}>Two</MenuItem>
            <MenuItem value={3}>Three</MenuItem>
            <MenuItem value={4}>Four</MenuItem>
            <MenuItem value={5}>Five</MenuItem>
          </Select>
        </Box>
        <Box sx={{ marginLeft: "1rem" }}>
          <Button variant="outlined" onClick={handleSearchByRating}>
            Search
          </Button>
        </Box>
      </FormControl>
    );
  }

  if (type === "location") {
    return (
      <>
        <Box
          sx={{
            marginBottom: "1rem",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button variant="text" onClick={handleGetLocation}>
            Find my Coordinates
          </Button>
        </Box>
        <FormControl
          sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
        >
          <TextField
            id="outlined-basic"
            label="Latitude"
            variant="outlined"
            value={lat}
            type="number"
            onChange={(e) => setLat(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Longitude"
            variant="outlined"
            value={long}
            type="number"
            onChange={(e) => setLong(e.target.value)}
          />
        </FormControl>
        <Box sx={{ marginY: "1rem" }}>
          <Button variant="outlined" onClick={handleSearchByLocation}>
            Search
          </Button>
        </Box>
      </>
    );
  }
}
