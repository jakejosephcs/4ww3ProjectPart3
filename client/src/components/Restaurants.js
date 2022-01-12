import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

export default function ImgMediaCard({ rest, setRest }) {
  return (
    <Container>
      {rest.map((_, idx) => (
        <Card sx={{ maxWidth: 345, marginY: 3 }}>
          <CardMedia
            component="img"
            alt="green iguana"
            height="140"
            image={_.image}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {_.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {_.description}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">See More</Button>
          </CardActions>
        </Card>
      ))}
    </Container>
  );
}
