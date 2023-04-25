const express = require("express");
const router = express.Router();
const commentModel = require('../models/commentModel')

router.post('/editComment', async (req, res) => {
    const { _id, username, stationName, comment } = req.body;

    try {
      await commentModel.findByIdAndUpdate(_id, {
        username: username,
        stationName: stationName,
        comment: comment
      });
      res.status(200).send('Comment updated successfully');
    } catch (err) {
      console.log(err);
      res.status(500).send('Error updating comment');
    }
  });

module.exports = router;