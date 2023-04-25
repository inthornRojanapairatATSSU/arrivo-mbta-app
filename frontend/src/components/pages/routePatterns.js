import React, { useState, useEffect, useRef } from 'react';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import getUserInfo from "../../utilities/decodeJwt";
import { Container, Button, ButtonGroup, Modal, ModalHeader, ModalBody, Form, FormControl, Col } from 'react-bootstrap';
import "./App.css";

function RoutePatterns() {
  
  const [user, setUser] = useState({});

  const [isTextWindowOpen, setIsTextWindowOpen] = useState(false);
  const textWindowRef = useRef(null);
  const [comments, setComments] = useState([]);

  const [info, setInfo] = useState('');

  const [alerts, setAlerts] = useState([]);
  const [filterName, setFilterName] = useState('');
  const [filterDirectionID, setFilterDirectionID] = useState(null);
  const directionSelectRef = useRef();
  const [filterTyp, setFilterTyp] = useState(null);
  const [filterId, setFilterId] = useState('');

  const { username } = user || {}; // checks if the user is logged in or not
  const [stationName, setStationName] = useState("");
  const [comment, setComment] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    setUser(getUserInfo())
    async function fetchData() {
      const result = await axios(
        'https://api-v3.mbta.com/route_patterns?sort=name',
      );
      setAlerts(result.data.data);
    }
    fetchData();
  }, []);

  useEffect(() => {
    // Fetch comments from MongoDB
    const fetchComments = async () => {
      try {
        const response = await axios.get("http://localhost:8081/comment/getAll");
        // Sort comments by date in descending order
        const sortedComments = response.data.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        setComments(sortedComments);
      } catch (error) {
        console.error("Failed to fetch comments:", error);
      }
    };

    // Fetch comments initially
    fetchComments();

    // Set up interval to fetch comments every 10 seconds
    const intervalId = setInterval(fetchComments, 10000);

    // Clean up interval on component unmount
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  // Helper function to format date string as "MM-DD-YYYY HH:mm:ss"
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const hour = date.getHours() % 12 || 12; // Convert to 12-hour format
    const minute = date.getMinutes().toString().padStart(2, '0');
    const second = date.getSeconds().toString().padStart(2, '0');
    const ampm = date.getHours() >= 12 ? 'PM' : 'AM';
    const formattedDate = `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()} ${hour}:${minute}:${second} ${ampm}`;
    return formattedDate;
  };

  // Opens the comments window
  const handleArrowClick = () => {
    setIsTextWindowOpen(!isTextWindowOpen);
  };
  
  // Clicking outside of the comments window closes the window
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (textWindowRef.current && !textWindowRef.current.contains(event.target)) {
        setIsTextWindowOpen(false);
      }
    };
    if (isTextWindowOpen) {
      document.addEventListener('click', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [isTextWindowOpen]);

  const handleInfoClick = (description) => {
    setInfo(description);
  }

  const handleInfoClear = () => {
    setInfo('');
  }

  const handleFilterNameChange = (event) => {
    setFilterName(event.target.value);
  };

  const handleDirectionChange = (event) => {
    setFilterDirectionID(event.target.value === '' ? null : event.target.value);
  };

  const handleFilterTypChange = (event) => {
    setFilterTyp(event.target.value === '' ? null : event.target.value);
  }

  const handleFilterIdChange = (event) => {
    setFilterId(event.target.value);
  };

  const handleResetFilters = () => {
    setFilterName("");
    setFilterDirectionID(null);
    directionSelectRef.current.value = "";
    setFilterTyp(null);
    setFilterId("");
  }

  const filterRoutePatterns = (alert) => {
    if (filterName !== '' && !alert.attributes.name.toLowerCase().includes(filterName.toLowerCase())) {
      return false;
    }
    if (filterDirectionID !== null && alert.attributes.direction_id.toString() !== filterDirectionID) {
      return false;
    }
    if (filterTyp !== null && alert.attributes.typicality.toString() !== filterTyp) {
      return false
    }
    if (filterId !== '' && !alert.id.toLowerCase().includes(filterId.toLowerCase())) {
      return false;
    }
    return true;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const commentData = {
      username,
      stationName,
      comment
    };
    try {
      const response = await fetch("http://localhost:8081/comment/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(commentData),
      });
      if (response.ok) {
        // Handle success, show modal
        setShowModal(true);
        setStationName("");
        setComment("");
      } else {
        // Handle errors, e.g., show an error message
        console.error("Failed to submit comment.");
      }
    } catch (error) {
      console.error("Failed to submit comment:", error);
    }
  };

  if (!user) return (<div><h4>Log in to view this page.</h4></div>)
  return (

    <div className="container"> &nbsp;

      <div className="Comments">
        <div className="Arrow" onClick={handleArrowClick}>
          {isTextWindowOpen ? (
            <i className="fas fa-chevron-left"></i>
          ) : (
            <i className="fas fa-chevron-right"></i>
          )}
        </div>
        {isTextWindowOpen && (
          <div className="TextWindow" ref={textWindowRef}>
            <h3>Comments</h3>
            <p>
              This is sorted by most recent.
            </p>
              <Container>
                <Col>
                  {comments.map((comment) => (
                    <Col key={comment._id} md={12}>
                      <Card className="mb-2">
                        <Card.Body>
                          <Card.Title>Username: {comment.username}</Card.Title>
                          <Card.Subtitle className="mb-2 text-muted">
                            Station Name: {comment.stationName}
                          </Card.Subtitle>
                          <Card.Text>Comment: {comment.comment}</Card.Text>
                          <Card.Text>Date: {formatDate(comment.date)}</Card.Text>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Col> &nbsp;
                <p>
                  Blank space.
                </p>
              </Container>
          </div>
        )}
      </div>

      <h2 className="text-center">Info</h2>
        <div className="text-center">
          <Container className="ml-auto">
            <ButtonGroup aria-label="Info button group">
              <Button variant="info" onClick={() => handleInfoClick('User-facing description of where trips on the route pattern serve. These names are published in the form Destination, Destination via Street or Landmark, Origin - Destination, or Origin - Destination via Street or Landmark. Note that names for bus and subway route patterns currently do not include the origin location, but will in the future.')}>Station Name</Button>
              <Button variant="info" onClick={() => handleInfoClick('Direction in which trip is traveling: Inbound or Outbound.')}>Direction</Button>
              <Button variant="info" onClick={() => handleInfoClick('Explains how common the route pattern is. For the MBTA, this is within the context of the entire route. Current valid values are: (1) Typical. Pattern is common for the route. Most routes will have only one such pattern per direction. A few routes may have more than 1, such as the Red Line (with one branch to Ashmont and another to Braintree); routes with more than 2 are rare. (2) Pattern is a deviation from the regular route. (3) Pattern represents a highly atypical pattern for the route, such as a special routing which only runs a handful of times per day. (4) Diversions from normal service, such as planned detours, bus shuttles, or snow routes.')}>Typicality</Button>
              <Button variant="info" onClick={() => handleInfoClick('User-facing description of when the route pattern operate. Not all route patterns will include a time description.')}>Time Description</Button>
              <Button variant="secondary" onClick={handleInfoClear}>Clear</Button>
            </ButtonGroup>
            {info && (
              <div className="mt-3">
                <h4>Description:</h4>
                <p>{info}</p>
              </div>
            )}
          </Container>
        </div> &nbsp;

      <h2 className="text-center">Filters</h2>
      <div className="text-center">
        <label htmlFor="name-filter">Name:</label> &nbsp;
        <input id="name-filter" type="text" onChange={handleFilterNameChange} value={filterName} />
        &nbsp;&nbsp;&nbsp;
        <label htmlFor="direction-select">Direction:</label> &nbsp;
        <select id="direction-select" onChange={handleDirectionChange} ref={directionSelectRef} style={{ width: "100px" }}>
          <option value="">--</option>
          <option value="0">Inbound</option>
          <option value="1">Outbound</option>
        </select>
        &nbsp;&nbsp;&nbsp;
        <label htmlFor="typicality-filter">Typicality: </label>&nbsp;
        <input id="typicality-filter" type="number" min="1" max="4" onChange={handleFilterTypChange} value={filterTyp} style={{ width: "50px" }} />
        &nbsp;&nbsp;&nbsp;
        <label htmlFor="id-filter">ID: </label> &nbsp;
        <input id="id-filter" type="text" onChange={handleFilterIdChange} value={filterId} style={{ width: "100px" }} />
      </div>
      &nbsp;
      <div className="text-center">
        <Button variant="secondary" onClick={handleResetFilters}>Reset</Button>
      </div>
      &nbsp;&nbsp;&nbsp;

      <h2 className="text-center">Feedback!</h2>
      <div className="text-center">
        <Button onClick={handleShow}>Click Me!</Button>
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
        >
          <ModalHeader closeButton>Feedback Window</ModalHeader>
          <ModalBody>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formStationName">
                <Form.Label>Station Name</Form.Label>
                <FormControl
                  type="text"
                  value={stationName}
                  onChange={(e) => setStationName(e.target.value)}
                  placeholder="Enter station name"
                />
              </Form.Group>
              <Form.Group controlId="formComment">
                <Form.Label>Feedback</Form.Label>
                <FormControl
                  type="text"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Enter your feedback here"
                />
              </Form.Group>
            </Form>
          </ModalBody>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={(e) => { handleSubmit(e); handleClose(); }}>
              Submit
            </Button>
          </Modal.Footer>
        </Modal>
        {showModal && (
        <div
          className="modal fade show"
          tabIndex="-1"
          role="dialog"
          style={{ display: "block" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Comment Added</h5>
                <button
                  type="button"
                  className="close"
                  onClick={() => setShowModal(false)}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p>Comment has been successfully added.</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showModal && (
        <div
          className="modal-backdrop fade show"
          onClick={() => setShowModal(false)}
        />
      )}
      </div> &nbsp;

      <h2 className="text-center">Route Patterns!</h2>
      <div className="row">
        {alerts
          .filter(filterRoutePatterns)
          .map(alert => (
            <div key={alert.id} className="col-sm-6 col-lg-4">
              <Card
                body
                border="info"
                outline
                className={'mx-auto my-2 text-center'}
                style={{ width: "75%", borderWidth: "10px" }}
              >
                <Card.Body>
                  <Card.Title>{alert.attributes.name}</Card.Title>
                  <Card.Text><b>Direction:</b> {alert.attributes.direction_id === 0 ? "Inbound" : "Outbound"}</Card.Text>
                  <Card.Text><b>Route:</b> {alert.relationships.route.data.id}</Card.Text>
                  <Card.Text><b>Typicality: </b>{alert.attributes.typicality}</Card.Text>
                  <Card.Text><b>Time Description:</b> {alert.attributes.time_desc}</Card.Text>
                  <Card.Text><b>ID:</b> {alert.id}</Card.Text>
                </Card.Body>
              </Card>
            </div>
          ))}
      </div>
    </div>
  );
}

export default RoutePatterns;
