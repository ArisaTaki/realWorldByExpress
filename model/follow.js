const mongoose = require('mongoose')
const baseURL = require('./base-model')
const {Schema} = require("mongoose");

const followSchema = new mongoose.Schema({
    ...baseURL,
    userId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    followerId: {
        type: Schema.Types.ObjectId,
        required: true
    }
})

module.exports = followSchema