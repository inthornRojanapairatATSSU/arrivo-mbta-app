import React, { useEffect, useState } from "react";
import getUserInfo from '../utilities/decodeJwt';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import ReactNavbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

// Here, we display our Navbar
export default function Navbar() {
  // We are pulling in the user's info but not using it for now.
  // Warning disabled: 
  // eslint-disable-next-line
  const [user, setUser] = useState({})
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();

  let username = "Guest";
  if (user) {
    username = user.username;
  }

  useEffect(() => {
  setUser(getUserInfo())
  }, [])

  const handleLogout = (async) => {
    localStorage.clear();
    navigate("/");
    window.location.reload();
  };
  
  // if (!user) return null   - for now, let's show the bar even not logged in.
  // we have an issue with getUserInfo() returning null after a few minutes
  // it seems.
  return (
    <ReactNavbar bg="primary" variant="dark">
    <Container>
      <ReactNavbar.Brand href="/">ARRIVO</ReactNavbar.Brand>
      <Nav className="me-auto">
		    <Nav.Link href = "/mbtaAlerts">Alerts</Nav.Link>
		    <Nav.Link href = "/routePatterns">Route Patterns</Nav.Link>
        <Nav.Link href = "#" disabled>Secret Train Routes</Nav.Link>
        <NavDropdown title="More" id="navbarScrollingDropdown">
          <NavDropdown.Item href = "/AboutUs">About Us</NavDropdown.Item>
          <NavDropdown.Divider></NavDropdown.Divider>
          <NavDropdown.Item href = "https://react-bootstrap.github.io/components/cards/" target="_blank">React Bootstrap</NavDropdown.Item>
          <NavDropdown.Item href = "https://api-v3.mbta.com/docs/swagger/index.html" target="_blank">Swagger UI</NavDropdown.Item>
          <NavDropdown.Item href = "#">Patreon (GIVE $$$)</NavDropdown.Item>
          <NavDropdown.Item href = "#">Kickstarter (NOT SCAM)</NavDropdown.Item>
        </NavDropdown>
      </Nav>
      <Nav className="ml-auto">
        <NavDropdown title={username ? username : "Guest"}>
          <NavDropdown.Item href="/profile" disabled={!user}>Profile</NavDropdown.Item>
          <NavDropdown.Item href="/editUserPage" disabled={!user}>Edit</NavDropdown.Item>
        </NavDropdown>
        
        <Nav.Link onClick={handleShow} disabled={!user}>Log Out</Nav.Link>
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Log Out</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to Log Out?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" href="/" onClick={handleLogout}>
              Yes
            </Button>
          </Modal.Footer>
        </Modal>
      </Nav>
    </Container>
  </ReactNavbar>

  );
}