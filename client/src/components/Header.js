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
              <Link to="/">Home</Link>
              {/* Only logged in user's can submit new reviews */}
              {token && <Link to="/submission">Add a New Restaurant</Link>}
              {/* Logged in user's DO NOT see the Sign in and Sign up link */}
              {!token && <Link to="/signin">Sign in</Link>}
              {!token && <Link to="/signup">Sign up</Link>}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}
