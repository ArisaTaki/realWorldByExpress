const mongoose = require("mongoose");
const baseModal = require("./base-model");

const ArticleSchema = new mongoose.Schema({
  ...baseModal,
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    default: null,
  },
  image: {
    type: String,
    default: null,
  }
});

module.exports = ArticleSchema;
