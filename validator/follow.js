const { param } = require('express-validator')
const { User, Follow } = require('../model')
const validate = require('../middleware/validator')

exports.follow = [
    async (req, res, next) => {
        const user = await User.findOne({username: req.params.username})
        if (!user) {
           return res.status(404).end()
        }
        next()
    }
    ,validate([
        param('username').custom(async (username, {req}) => {
            if (username === req.user.username) {
                return Promise.reject('不可关注自己')
            }
            const target = await User.findOne({ username })
            const isFollowed = await Follow.findOne({ userId: target._id, followerId: req.user._id })
            if (isFollowed) {
                if (isFollowed.followerId.toString() === req.user._id.toString()) {
                    return Promise.reject('您已关注')
                }
            }
            req.follow = target
        })
    ])
]

exports.unfollow = [
    async (req, res, next) => {
        const user = await User.findOne({username: req.params.username})
        if (!user) {
            return res.status(404).end()
        }
        next()
    }, validate([
        param('username').custom(async (username, {req}) => {
            if (username === req.user.username) {
                return Promise.reject('不可以对自己进行操作')
            }
            const target = await User.findOne({ username })
            const isFollowed = await Follow.findOne({ userId: target._id, followerId: req.user._id })
            if (isFollowed) {
                if (isFollowed.followerId.toString() !== req.user._id.toString()) {
                    return Promise.reject('您还没有关注')
                }
            }
            req.follow = isFollowed
        })
    ])
]

exports.getFollowUsers = async (req, res, next) => {
    const user = await User.findOne({username: req.params.username})
    if (!user) {
        return res.status(404).end()
    }
    req.user = user
    next()
}

exports.getFansUsers = exports.getFollowUsers