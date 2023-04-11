import React, { useState } from "react";

const CommentForm = () => {
  const [username, setUsername] = useState("");
  const [stationName, setStationName] = useState("");
  const [comment, setComment] = useState("");
  const [showModal, setShowModal] = useState(false);

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
        setUsername("");
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

  return (
    <div className="container mt-4">
      <h3>Add Comment</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="stationName">Station Name:</label>
          <input
            type="text"
            id="stationName"
            className="form-control"
            value={stationName}
            onChange={(e) => setStationName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="comment">Comment:</label>
          <textarea
            id="comment"
            className="form-control"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
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
    </div>
  );
};

export default CommentForm;