const express = require('express')
const profileCtrl = require('../controller/profile')
const auth = require('../middleware/auth')

const router = express.Router()

// 获取用户资料
router.get('/:username', profileCtrl.getUserInfo)

// 关注用户
router.post('/:username/follow', auth, profileCtrl.followUser)

// 取消关注
router.delete('/:username/follow', auth, profileCtrl.unFollowUser)

module.exports = router