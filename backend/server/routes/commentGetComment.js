const express = require("express");
const router = express.Router();

const commentModel = require("../models/commentModel");

router.get("/getCommentById", async (req, res) => {
  var { commentId } = req.body;

  commentModel.findById(commentId, function (err, comment) {
    if (err) {
      console.log(err);
    }
    if (comment==null) {
      res.status(404).send("commentId does not exist.");
    } 
    else {
      return res.json(comment);
    }
  });
});

module.exports = router;
