import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";

const ResponsiveAppBar = ({ token, setToken }) => {
  const pages = token ? ["Add Restaurant"] : ["Login"];

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" color="default" sx={{ marginBottom: 3 }}>
      <Container maxWidth="md">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
          >
            TOP EATS
          </Typography>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
          >
            TOP EATS
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}></Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Top Eats" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {token
                ? [
                    <>
                      <MenuItem onClick={handleCloseNavMenu}>
                        <Typography textAlign="center">
                          <Link
                            to="/"
                            onClick={() => {
                              setToken(null);
                              localStorage.clear();
                            }}
                          >
                            Logout
                          </Link>
                        </Typography>
                      </MenuItem>
                      <MenuItem onClick={handleCloseNavMenu}>
                        <Typography textAlign="center">
                          <Link to="/submission">Add a restaurant</Link>
                        </Typography>
                      </MenuItem>
                    </>,
                  ]
                : [
                    <>
                      <MenuItem onClick={handleCloseNavMenu}>
                        <Typography textAlign="center">
                          <Link to="/signup">Sign up</Link>
                        </Typography>
                      </MenuItem>
                      <MenuItem onClick={handleCloseNavMenu}>
                        <Typography textAlign="center">
                          <Link to="/signin">Sign in</Link>
                        </Typography>
                      </MenuItem>
                    </>,
                  ]}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;

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
