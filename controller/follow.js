const { Follow } = require('../model')

exports.follow = async (req, res, next) => {
    try {
        let follow = new Follow ({
            userId: req.follow.uid,
            followerId: req.user.uid
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
        res.send('unfollowed')
    } catch (error) {
        next(error)
    }
}