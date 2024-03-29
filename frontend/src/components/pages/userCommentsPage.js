import React, { useState, useEffect } from 'react';
import { Card, Container, Dropdown, Row, Col, Button, Modal, Form } from 'react-bootstrap';
import getUserInfo from "../../utilities/decodeJwt";

function CommentList() {
  const [user, setUser] = useState([]);
  const [comments, setComments] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editComment, setEditComment] = useState({});
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    setUser(getUserInfo())
    async function fetchComments() {
      const response = await fetch('http://localhost:8081/comment/getAll');
      const data = await response.json();
      data.sort((a, b) => new Date(b.date) - new Date(a.date)); // sort by most recent date
      setComments(data);
    }
    fetchComments();
  }, []);

  // Helper function to format date string as "MM-DD-YYYY HH:mm:ss AM/PM"
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const hour = date.getHours() % 12 || 12; // Convert to 12-hour format
    const minute = date.getMinutes().toString().padStart(2, '0');
    const second = date.getSeconds().toString().padStart(2, '0');
    const ampm = date.getHours() >= 12 ? 'PM' : 'AM';
    const formattedDate = `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()} ${hour}:${minute}:${second} ${ampm}`;
    return formattedDate;
  };

  function filterComments(comment) {
    switch (filter) {
      case 'My Comments':
        return comment.username === user.username;
      case 'Others':
        return comment.username !== user.username;
      default:
        return true;
    }
  }

  const handleEditClick = (comment) => {
    setEditComment(comment);
    setShowEditModal(true);
  };

  const handleEditSubmit = (event) => {
    event.preventDefault();
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editComment)
    };
    fetch('http://localhost:8081/comment/editComment', requestOptions)
      .then(response => response.json())
      .then(() => {
        setShowEditModal(false);
        setComments(comments.map(c => c._id === editComment._id ? editComment : c));
      });
  };

  const refreshPage = (event) => {
    window.location.reload();
  };

  async function handleDelete(commentId) {
    const response = await fetch('http://localhost:8081/comment/deleteCommentById', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ commentId })
    });
    const data = await response.json();
    setComments(comments.filter(comment => comment._id !== data._id));
  }

  if (!user) return (<div><h4>Log in to view this page.</h4></div>)
  return (
    <Container>
      <Row className="justify-content-center mt-4">
        <Col md={6}>
          <Dropdown className="mb-4">
            <Dropdown.Toggle variant="primary" id="filter-dropdown">
              {filter}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => setFilter('All')}>
                All Comments
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setFilter('My Comments')}>
                My Comments
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setFilter('Others')}>
                Others' Comments
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          {comments.filter(filterComments).map((comment) => (
            <Card key={comment._id} className="mb-4">
              <Card.Header>{comment.username}</Card.Header>
              <Card.Body>
                <Card.Title>{comment.stationName}</Card.Title>
                <Card.Text>{comment.comment}</Card.Text>
                {comment.username === user.username && (
                  <div>
                    <Button variant="primary" onClick={() => handleEditClick(comment)}>
                      Edit
                    </Button>{' '}
                    <Button className="mr-2" variant="danger" onClick={() => handleDelete(comment._id)}>
                      Delete
                    </Button>
                  </div>
                )}
              </Card.Body>
              <Card.Footer>{formatDate(comment.date)}</Card.Footer>
            </Card>
          ))}
        </Col>
      </Row>
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Feedback</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleEditSubmit}>
            <Form.Group controlId="formStationName">
              <Form.Label>Station Name</Form.Label>
              <Form.Control type="text" value={editComment.stationName} onChange={e => setEditComment({...editComment, stationName: e.target.value})} />
            </Form.Group>
            <Form.Group controlId="formComment">
              <Form.Label>Feedback</Form.Label>
              <Form.Control type="text" value={editComment.comment} onChange={e => setEditComment({...editComment, comment: e.target.value})} />
            </Form.Group>
            <Button variant="primary" type="submit" onClick={refreshPage}>
              Save Changes
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default CommentList;
