const express = require("express");
const router = express.Router();
const commentModel = require('../models/commentModel')

router.post('/deleteAll', async (req, res) => {
    const comment = await commentModel.deleteMany();
    return res.json(comment)
  })

  module.exports = router;