const mongoose = require('mongoose')
const baseURL = require('./base-model')
const {Schema} = require("mongoose");

const followSchema = new mongoose.Schema({
    ...baseURL,
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    Follower: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
})

module.exports = followSchema