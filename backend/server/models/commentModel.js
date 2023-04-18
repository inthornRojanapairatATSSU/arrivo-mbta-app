const mongoose = require("mongoose");

//user schema/model
const commentSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      label: "username",
    },
    stationName: {
      type: String,
      required: true,
      label: "stationName",
    },
    comment: {
      type: String,
      required: true,
      label: "comment",
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: "comments" }
);

module.exports = mongoose.model('comments', commentSchema)