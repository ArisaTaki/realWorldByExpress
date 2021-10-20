const mongoose = require('mongoose')
const { Schema } = require('mongoose')
const baseModal = require('./base-model')

const favoriteSchema = new mongoose.Schema({
    ...baseModal,
    article: {
        type: Schema.Types.ObjectId,
        ref: 'Article',
        required:true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

module.exports = favoriteSchema