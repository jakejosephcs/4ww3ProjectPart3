import * as React from "react";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";
import { Container, Typography, Button } from "@mui/material";
import TextField from "@mui/material/TextField";

const labels = {
  1: "Useless",
  2: "Poor",
  3: "Ok",
  4: "Good",
  5: "Excellent",
};

export default function BasicSelect({
  handleReviewSubmission,
  review,
  setReview,
  rating,
  setRating,
}) {
  const [value, setValue] = React.useState(rating);
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: 3,
        padding: 1,
        borderTop: "1px solid lightgray",
      }}
    >
      <Typography>Leave a review and a rating:</Typography>
      <Box
        sx={{
          width: 200,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Rating
          name="simple-controlled"
          value={value}
          onChange={(event, newValue) => {
            setRating(newValue);
            setValue(newValue);
          }}
        />
      </Box>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="outlined-basic"
          label="Leave a review"
          variant="outlined"
          value={review}
          onChange={(e) => setReview(e.target.value)}
        />
      </Box>
      <Button variant="contained" onClick={handleReviewSubmission}>
        Add Review
      </Button>
    </Container>
  );
}
