import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

import Rating from "./Rating";

export default function ActionAreaCard({ rest, reviews }) {
  const calculateRating = (reviews) => {
    const ratings = reviews.map((r) => r.data.rating);
    return ratings.reduce((a, b) => a + b, 0) / ratings.length;
  };

  console.log("RC, reviews: ", reviews);

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={rest.image}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {rest.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {rest.description}
          </Typography>
          {reviews.length !== 0 && (
            <Rating ratingValue={calculateRating(reviews)} />
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
