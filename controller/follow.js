const { Follow, User } = require('../model')
const {raw} = require("express");

exports.follow = async (req, res, next) => {
    try {
        let follow = new Follow ({
            userId: req.follow._id,
            followerId: req.user._id
        })

        await follow.save()
        res.status(201).json({
            follow
        })
    } catch (error) {
        next(error)
    }
}

exports.unfollow = async (req, res, next) => {
    try {
        const follow = req.follow
        await follow.remove()
        res.status(204).end()
    } catch (error) {
        next(error)
    }
}

exports.getFollowUsers = async (req, res, next) => {
    try {
        // res.send('getUsers!')
        const user = req.user
        const followers = await Follow.find({followerId: user._id.toString()})
        let followerInfos = []
        for (let i = 0; i < followers.length; i++) {
            const res = await User.findOne({_id: followers[i].userId})
            followerInfos.push(res)
        }

        // 这里不能使用map。内嵌的方法无法异步
        // followers.map(async data => {
        //     const res = await User.findOne({_id: data.user})
        //     followerInfos.push(res)
        // })
        res.status(200).json({
            followerInfos
        })
    } catch (error) {
        next(error)
    }
}