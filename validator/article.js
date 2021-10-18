const { body, param } = require('express-validator')
const validate = require('../middleware/validator')
const mongoose = require('mongoose')

exports.createArticle = validate([
    body('article.title').notEmpty().withMessage('文章标题不能为空'),
    body('article.description').notEmpty().withMessage('文章摘要不能为空'),
    body('article.body').notEmpty().withMessage('文章内容不能为空')
])

exports.getArticle = validate([
    validate.isValidObjectId(['params'], ['articleId'])
])

exports.updateArticle = validate([
    validate.isValidObjectId(['params'], ['articleId'])
])