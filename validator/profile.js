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

exports.followProfile = validate([
    body('profile.following').notEmpty().withMessage('不可为空').bail()
        //isBoolean的严格模式还没看到文档，后续再研究，处理布尔值的方法只能使用箭头函数进行下述操作了
        .custom(value => value === true || value === false).withMessage('参数非法'),
])