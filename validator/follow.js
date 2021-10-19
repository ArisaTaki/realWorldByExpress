const { param } = require('express-validator')
const { User, Follow } = require('../model')
const validate = require('../middleware/validator')

exports.follow = [
    async (req, res, next) => {
        const user = await User.findOne({username: req.params.username})
        if (!user) {
            res.status(404).end()
        }
        next()
    }
    ,validate([
        param('username').custom(async (username, {req}) => {
            if (username === req.user.username) {
                return Promise.reject('不可关注自己')
            }
            const target = await User.findOne({ username })
            const isFollowed = await Follow.findOne({ userId: target.uid, followerId: req.user.uid })
            if (isFollowed) {
                if (isFollowed.followerId === req.user.uid) {
                    return Promise.reject('您已关注')
                }
            }
            req.follow = target
        })
    ])
]