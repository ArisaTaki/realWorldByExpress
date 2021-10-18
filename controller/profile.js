// 获取用户资料
exports.getUserInfo = async (req, res, next) => {
  try {
    // 处理请求
    const profile = req.article
    res.status(200).json({
      profile
    })
  } catch (err) {
    next(err);
  }
};

// 关注用户
exports.followUser = async (req, res, next) => {
  try {
    const profile = req.profile
    profile.following = req.body.profile.following
    await profile.save()
    res.status(200).json({
      profile
    })
  } catch (err) {
    next(err);
  }
};

// 取消关注
exports.unFollowUser = async (req, res, next) => {
  try {
    const unFollowProfile = req.profile
    unFollowProfile.following = req.body.profile.following
    await unFollowProfile.save()
    res.status(200).json({
      profile: unFollowProfile
    })
  } catch (err) {
    next(err);
  }
};
