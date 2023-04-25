import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Modal, Form } from 'react-bootstrap';


const CommentList = () => {
  const [comments, setComments] = useState([]);
  const [selectedComment, setSelectedComment] = useState(null);
  const [editedComment, setEditedComment] = useState("");
  const [showModal, setShowModal] = useState(false);


  useEffect(() => {
    fetchComments();
  }, []);


  const fetchComments = async () => {
    const response = await axios.get('http://localhost:8081/comment/getAll');
    setComments(response.data);
  };


  const handleEditComment = async () => {
    try {
      const response = await axios.post('http://localhost:8081/comment/editComment', {
        _id: selectedComment._id,
        comment: editedComment
      });
      setSelectedComment(null);
      setEditedComment("");
      fetchComments();
      handleCloseModal();
    } catch (error) {
      console.error(error);
    }
  };


  const handleCommentClick = (comment) => {
    setSelectedComment(comment);
    setEditedComment(comment.comment);
    setShowModal(true);
  };


  const renderComments = () => {
    return comments.map((comment) => {
      return (
        <div key={comment._id} onClick={() => handleCommentClick(comment)} className="my-3">
          <h4 className="text-primary">{comment.username}</h4>
          <p>{comment.comment}</p>
          <small className="text-muted">{comment.stationName}</small>
          <hr />
        </div>
      );
    });
  };


  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedComment(null);
    setEditedComment("");
  };


  const renderEditModal = () => {
    if (!selectedComment) return null;


    return (
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Comment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="commentForm.ControlTextarea1">
              <Form.Label>Edit your comment:</Form.Label>
              <Form.Control as="textarea" rows={3} value={editedComment} onChange={(e) => setEditedComment(e.target.value)} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>Cancel</Button>
          <Button variant="primary" onClick={handleEditComment}>Save</Button>
        </Modal.Footer>
      </Modal>
    );
  };


  return (
    <div className="container mt-5">
      <h2 className="mb-4">Comment List</h2>
      {renderComments()}
      {renderEditModal()}
    </div>
  );
};


export default CommentList;