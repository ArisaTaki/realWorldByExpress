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

    const username = req.params.username

    let followProfile = await Profile.findOne({ username })

    if (req.body.following && !followProfile.following) {
      followProfile.following = true
      await followProfile.save()
      res.status(200).json({
        followProfile
      });
    } else {
      res.status(422).json({
        errors: {
          body: "您已关注"
        }
      })
    }
  } catch (err) {
    next(err);
  }
};

// 取消关注
exports.unFollowUser = async (req, res, next) => {
  try {

    const username = req.params.username

    let followProfile = await Profile.findOne({ username })

    if (!req.body.following && followProfile.following) {
      followProfile.following = false
      await followProfile.save()
      res.status(200).json({
        followProfile
      });
    } else {
      res.status(422).json({
        errors: {
          body: "您未关注"
        }
      })
    }
    res.send("post /:username/follow");
  } catch (err) {
    next(err);
  }
};
