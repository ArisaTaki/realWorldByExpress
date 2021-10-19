const mongoose = require('mongoose')
const baseURL = require('./base-model')
const {Schema} = require("mongoose");

const followSchema = new mongoose.Schema({
    ...baseURL,
    userId: {
        type: Number,
        required: true
    },
    followerId: {
        type: Number,
        required: true
    }
})

module.exports = followSchema