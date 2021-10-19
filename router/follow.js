const express = require("express");
const followCtrl = require("../controller/follow");
const followValidate = require('../validator/follow')
const auth = require('../middleware/auth')
const router = express.Router();

// 关注用户
router.post('/:username', auth, followValidate.follow, followCtrl.follow)

// 取消关注用户
router.delete('/:username', auth, followValidate.unfollow, followCtrl.unfollow)

module.exports = router