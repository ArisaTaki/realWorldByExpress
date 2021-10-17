const { Profile } = require('../model')

// 获取用户资料
exports.getUserInfo = async (req, res, next) => {
  try {
    // 处理请求
    const username = req.params.username

    let profile = await Profile.findOne({ username })

    res.status(200).json({
      profile
    });
  } catch (err) {
    next(err);
  }
};

// 关注用户
exports.followUser = async (req, res, next) => {
  try {
    res.send("post /:username/follow");
  } catch (err) {
    next(err);
  }
};

// 取消关注
exports.unFollowUser = async (req, res, next) => {
  try {
    res.send("post /:username/follow");
  } catch (err) {
    next(err);
  }
};
