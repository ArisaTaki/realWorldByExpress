const { Follow } = require('../model')

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