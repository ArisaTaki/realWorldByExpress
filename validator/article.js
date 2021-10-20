const { body } = require('express-validator')
const validate = require('../middleware/validator')
const { Article, Comments} = require('../model')

exports.createArticle = validate([
    body('article.title').notEmpty().withMessage('文章标题不能为空'),
    body('article.description').notEmpty().withMessage('文章摘要不能为空'),
    body('article.body').notEmpty().withMessage('文章内容不能为空')
])

exports.getArticle = validate([
    validate.isValidObjectId(['params'], ['articleId'])
])

exports.updateArticle = [
    validate([
        validate.isValidObjectId(['params'], ['articleId'])
]),
    //校验文章是否存在
    async (req, res, next) => {
        const articleId = req.params.articleId
        const article = await Article.findById(articleId)
        req.article = article
        if (!article) {
            return res.status(404).end()
        }
        next()
    },
    //修改文章的作者是不是当前登录的用户
    async (req, res, next) => {
        if (req.user._id.toString() !== req.article.author.toString()) {
            return res.status(403).end()
        }
        next()
    }
]

exports.deleteArticle = exports.updateArticle

exports.addComment = [
    validate([
        validate.isValidObjectId(['params'],['articleId'])
    ]),
    async (req, res, next) => {
        const articleId = req.params.articleId
        const article = await Article.findById(articleId)
        req.article = article
        if (!article) {
            return res.status(404).end()
        }
        next()
    },
    validate([
        body('comment.body').notEmpty().withMessage('评论不能为空').bail()
    ])
]

exports.getComments = [
    validate([
        validate.isValidObjectId(['params'],['articleId'])
    ]),
    async (req, res, next) => {
        const articleId = req.params.articleId
        const article = await Article.findById(articleId)
        req.article = article
        if (!article) {
            return res.status(404).end()
        }
        next()
    },
]

exports.deleteComments = [
    validate([
        validate.isValidObjectId(['params'], ['commentId'])
    ]),
    async (req, res, next) => {
        const commentId = req.params.commentId
        const comment = await Comments.findById(commentId)
        req.comment = comment
        if (!comment) {
            return res.status(404).end()
        }
        next()
    },
    async (req, res, next) => {
        if (req.user._id.toString() !== req.comment.user.toString()) {
            return res.status(403).end()
        }
        next()
    }
]