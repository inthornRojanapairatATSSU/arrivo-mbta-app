const mongoose = require("mongoose");

//user schema/model
const newUserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      label: "username",
    },
    email: {
      type: String,
      required: true,
      label: "email",
    },
    password: {
      required: true,
      type: String,
      min : 8
    },
    favline: {
      type: String,
      required: true,
      label: "favline"
    },
    favroute: {
      type: String,
      required: true,
      label: "favroute"
    },
    darktheme: {
      type: Boolean,
      default: false
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: "users" }
);

module.exports = mongoose.model('users', newUserSchema)