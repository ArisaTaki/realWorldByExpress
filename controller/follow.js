exports.follow = async (req, res, next) => {
    try {
        res.send('followed')
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