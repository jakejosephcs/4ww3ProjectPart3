// Import all necessary components from React, React-Bootstrap and React Router DOM
import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

// The Header component recieves the JWT token as a prop to dynamically display
//   certain links based on if the user is logged in or not
export default function Header({ token }) {
  return (
    <header>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">Top Eats</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link>
                <Link to="/">Home</Link>
              </Nav.Link>
              {/* Only logged in user's can submit new reviews */}
              {token && (
                <Nav.Link>
                  <Link to="/submission">Add a New Restaurant</Link>
                </Nav.Link>
              )}
              {/* Logged in user's DO NOT see the Sign in and Sign up link */}
              {!token && (
                <Nav.Link>
                  <Link to="/signin">Sign in</Link>
                </Nav.Link>
              )}
              {!token && (
                <Nav.Link>
                  <Link to="/signup">Sign up</Link>
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}
