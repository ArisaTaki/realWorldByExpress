const { Follow, User } = require('../model')
const {raw} = require("express");

exports.follow = async (req, res, next) => {
    try {
        let follow = new Follow ({
            user: req.follow._id,
            follower: req.user._id
        })
        await follow.populate(['user', 'follower'])
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
        const followers = await Follow.find({follower: user._id.toString()})
        let followerInfos = []
        for (let i = 0; i < followers.length; i++) {
            const res = await User.findOne({_id: followers[i].user})
            followerInfos.push(res)
        }

        // 这里不能使用map。内嵌的方法无法异步
        // followers.map(async data => {
        //     const res = await User.findOne({_id: data.user})
        //     followerInfos.push(res)
        // })
        res.status(200).json({
            followerInfos,
            counts: followerInfos.length
        })
    } catch (error) {
        next(error)
    }
}

exports.getFansUsers = async (req, res, next) => {
    try {
        const fans = await Follow.find({user: req.user._id.toString()})
        let fansInfo = []
        for (let i = 0; i < fans.length; i++) {
            const res = await User.findOne({_id: fans[i].follower})
            fansInfo.push(res)
        }

        res.status(200).json({
            fansInfo,
            counts: fansInfo.length
        })
    } catch (error) {
        next(error)
    }
}