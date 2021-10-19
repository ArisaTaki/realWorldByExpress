const express = require('express')

const router = express.Router()

// 用户相关路由
router.use(require('./user'))
// 文章相关路由
router.use('/articles', require('./article'))
// 标签相关路由
router.use('/tags', require('./tag'))
// 关注相关路由
router.use('/follow', require('./follow'))

module.exports = router