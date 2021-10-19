const { body } = require('express-validator')
const validate = require('../middleware/validator')
const { Profile } = require('../model')

exports.getProfileInfo = async (req, res, next) => {
    const username = req.params.username
    const profile = await Profile.findOne({ username })
    if (profile) {
        req.article = profile
        next()
    } else {
        res.status(404).end()
    }
}

// 此关注还未实装根据不同用户查询不同的数据，后续添加
exports.followProfile = validate([
    body('profile.following').notEmpty().withMessage('不可为空').bail()
        //isBoolean的严格模式还没看到文档，后续再研究，处理布尔值的方法只能使用箭头函数进行下述操作了
        .custom(value => value === true).withMessage('参数非法').bail()
        .custom(async (following, { req }) => {
            // 不能自己关注自己
            if (req.user.username === req.params.username) {
                return Promise.reject('不能对自己进行操作')
            }
            // 不能重复关注
            const profile = await Profile.findOne({ username: req.params.username })
            if (profile.following) {
                await Promise.reject('不能重复关注')
            }
            req.profile = profile
        })
])

exports.unfollowProfile = validate([
    body('profile.following').notEmpty().withMessage('不可为空').bail()
        //isBoolean的严格模式还没看到文档，后续再研究，处理布尔值的方法只能使用箭头函数进行下述操作了
        .custom(value => value === false).withMessage('参数非法').bail()
        .custom(async (following, { req }) => {
            // 不能操作自己
            if (req.user.username === req.params.username) {
                return Promise.reject('不能对自己进行操作')
            }
            // 根本没有关注
            const profile = await Profile.findOne({ username: req.params.username })
            if (!profile.following) {
                await Promise.reject('您还没有关注')
            }
            console.log(profile)
            req.profile = profile
        })
])