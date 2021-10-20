const mongoose = require('mongoose')
const baseModal = require('./base-model')
const { Schema } = require('mongoose')

const CommentSchema = new mongoose.Schema({
    ...baseModal,
    article: {
        type: Schema.Types.ObjectId,
        ref: 'Article',
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    // 后续再做富文本
    comment: {
        type: String,
        required: true
    },
})

module.exports = CommentSchema