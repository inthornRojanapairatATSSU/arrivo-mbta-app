const express = require("express");
const router = express.Router();
const commentModel = require('../models/commentModel')

router.post('/deleteCommentById', async (req, res) => {
  const { commentId } = req.body;
  
  try {
    const comment = await commentModel.findByIdAndDelete(commentId);
    if (!comment) {
      return res.status(404).send("Comment not found");
    }
    return res.json(comment);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal server error");
  }
});

module.exports = router;
