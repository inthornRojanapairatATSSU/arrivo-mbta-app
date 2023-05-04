import React, { useState, useEffect } from "react";
import axios from "axios";

const CommentsPage = () => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    // Fetch comments from MongoDB
    axios.get("http://localhost:8081/comment/getAll").then((response) => {
      setComments(response.data);
    });
  }, []);

  return (
    <div>
      <h1>Comments</h1>
      <div className="comments-container">
        {comments.map((comment) => (
          <div key={comment._id} className="comment-card">
            <h2>Username: {comment.username}</h2>
            <h3>Station Name: {comment.stationName}</h3>
            <p>Comment: {comment.comment}</p>
            <p>Date: {comment.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentsPage;
