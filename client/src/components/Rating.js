import * as React from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import { Typography } from "@mui/material";

export default function BasicRating({ ratingValue }) {
  const [value, setValue] = React.useState(ratingValue);

  return (
    <Box
      sx={{
        "& > legend": { mt: 1 },
        marginTop: 1,
      }}
    >
      {!value && <Typography component="legend">No reviews</Typography>}
      <Rating name="read-only" value={value} readOnly />
    </Box>
  );
}
