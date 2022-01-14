import * as React from "react";
import Table from "@mui/material/Table";
import Typography from "@mui/material/Typography";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(name, description, coordinates, rating, id) {
  return { name, description, coordinates, rating, id };
}

export default function BasicTable({ rest }) {
  console.log(rest);
  const rows = rest.map((r) =>
    createData(r.name, r.description, r.location.coordinates, r.rating, r._id)
  );

  const calculateRating = (ratings) => {
    return ratings.reduce((a, b) => a + b, 0) / ratings.length;
  };

  if (rest.length === 0) {
    return (
      <Typography
        variant="h6"
        sx={{ display: "flex", justifyContent: "center", textAlign: "center" }}
      >
        We could not find any results that match that query
      </Typography>
    );
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Description</TableCell>
            <TableCell align="right">Location&nbsp;(coordinates)</TableCell>
            <TableCell align="right">Rating&nbsp;(max 5)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <a href={`/restaurant/${row.id}`}>{row.name}</a>
              </TableCell>
              <TableCell align="right">{row.description}</TableCell>
              <TableCell align="right">
                {row.coordinates[0]} {row.coordinates[1]}
              </TableCell>
              <TableCell align="right">{calculateRating(row.rating)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
