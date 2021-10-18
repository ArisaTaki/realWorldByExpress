const express = require('express')
const profileCtrl = require('../controller/profile')
const auth = require('../middleware/auth')
const profileValidate = require('../validator/profile')

const router = express.Router()

// 获取用户资料
router.get('/:username', profileValidate.getProfileInfo ,profileCtrl.getUserInfo)

// 关注用户
router.post('/:username/follow', auth, profileValidate.followProfile, profileCtrl.followUser)

// 取消关注
router.delete('/:username/follow', auth, profileValidate.unfollowProfile, profileCtrl.unFollowUser)

module.exports = router