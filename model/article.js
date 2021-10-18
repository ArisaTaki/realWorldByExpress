const mongoose = require("mongoose");
const baseModal = require("./base-model");
const {Schema} = require("mongoose");

const ArticleSchema = new mongoose.Schema({
  ...baseModal,
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  tagList: {
    type: [String],
    default: null
  },
  image: {
    type: String,
    default: null
  },
  favoritesCount: {
    type: Number,
    default: 0
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
});

module.exports = ArticleSchema;
