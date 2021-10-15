const mongoose = require('mongoose')
const baseModal = require("./base-model");

const profileSchema = new mongoose.Schema({
    ...baseModal,
    username: {
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
    },
    following: {
        type: Boolean,
        required: true,
        default: false
    }
});

module.exports = profileSchema;
