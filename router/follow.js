const express = require("express");
const followCtrl = require("../controller/follow");
const followValidate = require('../validator/follow')
const auth = require('../middleware/auth')
const router = express.Router();

// 关注用户
router.post('/:username', auth, followValidate.follow, followCtrl.follow)

// 取消关注用户
router.delete('/:username', auth, followValidate.unfollow, followCtrl.unfollow)

// 获取当前用户关注列表
router.get('/:username', auth, followValidate.getFollowUsers, followCtrl.getFollowUsers)

// 获取当前用户粉丝列表

module.exports = router



//1.企業信息，没有就未设定
//2.法人信息，没有就未设定
//3.申述数量以及商谈次数都是默认为0.如果没有
//4.Keyword要是没有的话直接取消那一块block