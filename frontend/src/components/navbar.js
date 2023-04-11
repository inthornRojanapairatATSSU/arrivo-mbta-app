import React, { useEffect, useState } from "react";
import getUserInfo from '../utilities/decodeJwt';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import ReactNavbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

// Here, we display our Navbar
export default function Navbar() {
  // We are pulling in the user's info but not using it for now.
  // Warning disabled: 
  // eslint-disable-next-line
  const [user, setUser] = useState({})

  useEffect(() => {
  setUser(getUserInfo())
  }, [])
  
  // if (!user) return null   - for now, let's show the bar even not logged in.
  // we have an issue with getUserInfo() returning null after a few minutes
  // it seems.
  return (
    <ReactNavbar bg="primary" variant="dark">
    <Container>
      <ReactNavbar.Brand href="/">ARRIVO</ReactNavbar.Brand>
      <Nav className="me-auto">
        <Nav.Link href="/">Start</Nav.Link>
        <Nav.Link href="/home">Home</Nav.Link>
        <Nav.Link href="/privateUserProfile">Profile</Nav.Link>
		    <Nav.Link href = "/mbtaAlerts">Alerts</Nav.Link>
		    <Nav.Link href = "/routePatterns">Route Patterns</Nav.Link>
        <Nav.Link href = "#" disabled>Secret Train Routes</Nav.Link>
        <NavDropdown title="More" id="navbarScrollingDropdown">
          <NavDropdown.Item href = "/AboutUS">About Us</NavDropdown.Item>
          <NavDropdown.Item href = "#">Patreon (GIVE $$$)</NavDropdown.Item>
          <NavDropdown.Divider></NavDropdown.Divider>
          <NavDropdown.Item href = "#">Kickstarter (NOT SCAM)</NavDropdown.Item>
        </NavDropdown>
      </Nav>
    </Container>
  </ReactNavbar>

  );
}
