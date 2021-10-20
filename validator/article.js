const { body, param} = require('express-validator')
const validate = require('../middleware/validator')
const { Article, Comments, User, Favorite} = require('../model')

exports.createArticle = validate([
    body('article.title').notEmpty().withMessage('文章标题不能为空'),
    body('article.description').notEmpty().withMessage('文章摘要不能为空'),
    body('article.body').notEmpty().withMessage('文章内容不能为空')
])

exports.getArticle = [validate([
    validate.isValidObjectId(['params'], ['articleId'])
]),
    async (req, res, next) => {
        const articleId = req.params.articleId
        const article = await Article.findById(articleId).populate('author')
        req.article = article
        if (!article) {
            return res.status(404).end()
        }
        next()
    },
]

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

exports.getUserArticle = [
    async (req, res, next) => {
        const username = req.params.username
        const user = await User.findOne({ username })
        if(!user) {
            return res.status(404).end()
        }
        req.user = user
        next()
    }
]

exports.favoriteArticle = [
    validate([
        validate.isValidObjectId(['params'], ['articleId'])
    ]),
    async (req, res, next) => {
        const articleId = req.params.articleId
        const article = await Article.findById(articleId)
        if(!article) {
            return res.status(404).end()
        }
        next()
    },
    validate([
        param('articleId').custom(async (articleId, { req }) => {
            const isFavorite = await Favorite.findOne({ article: articleId, user: req.user._id })
            if (isFavorite) {
                return Promise.reject('您已点赞，请勿重复操作')
            }
        })
    ])
]

exports.unfavoriteArticle = [
    validate([
        validate.isValidObjectId(['params'], ['articleId'])
    ]),
    async (req, res, next) => {
        const articleId = req.params.articleId
        const article = await Article.findById(articleId)
        if(!article) {
            return res.status(404).end()
        }
        req.article = article
        next()
    },
    validate([
        param('articleId').custom(async (articleId, { req }) => {
            const isFavorite = await Favorite.findOne({ article: articleId, user: req.user._id })
            if (!isFavorite) {
                return Promise.reject('未点赞，无法取消')
            }
            req.favorite = isFavorite
        })
    ])
]