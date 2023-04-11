const express = require("express");
const router = express.Router();
const commentModel = require('../models/commentModel')

router.get('/getAll', async (req, res) => {
    const comments = await commentModel.find();
    return res.json(comments)
  })

  module.exports = router;