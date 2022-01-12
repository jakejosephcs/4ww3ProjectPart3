import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Typography, Container } from "@mui/material";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

export default function BasicMenu({ token }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Typography variant="h5">Top Eats</Typography>
      <div>
        <Button
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          Menu
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={handleClose}>Home</MenuItem>
          {!token && <MenuItem onClick={handleClose}>Sign in</MenuItem>}
          {!token && <MenuItem onClick={handleClose}>Sign up</MenuItem>}
          {token && <MenuItem onClick={handleClose}>Add a Restaurant</MenuItem>}
        </Menu>
      </div>
    </Container>
  );
}

// // Import all necessary components from React, React-Bootstrap and React Router DOM
// import React from "react";
// import { Navbar, Nav, Container } from "react-bootstrap";
// import { Link } from "react-router-dom";

// // The Header component recieves the JWT token as a prop to dynamically display
// //   certain links based on if the user is logged in or not
// export default function Header({ token }) {
//   return (
//     <header>
//       <Navbar bg="light" expand="lg">
//         <Container>
//           <Navbar.Brand href="#home">Top Eats</Navbar.Brand>
//           <Navbar.Toggle aria-controls="basic-navbar-nav" />
//           <Navbar.Collapse id="basic-navbar-nav">
//             <Nav className="me-auto">
//               <Nav.Link>
//                 <Link to="/">Home</Link>
//               </Nav.Link>
//               {/* Only logged in user's can submit new reviews */}
//               {token && (
//                 <Nav.Link>
//                   <Link to="/submission">Add a New Restaurant</Link>
//                 </Nav.Link>
//               )}
//               {/* Logged in user's DO NOT see the Sign in and Sign up link */}
//               {!token && (
//                 <Nav.Link>
//                   <Link to="/signin">Sign in</Link>
//                 </Nav.Link>
//               )}
//               {!token && (
//                 <Nav.Link>
//                   <Link to="/signup">Sign up</Link>
//                 </Nav.Link>
//               )}
//             </Nav>
//           </Navbar.Collapse>
//         </Container>
//       </Navbar>
//     </header>
//   );
// }
