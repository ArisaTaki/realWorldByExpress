const { body, param } = require('express-validator')
const { User } = require('../model')
const validate = require('../middleware/validator')

exports.follow = validate([
    param()
])