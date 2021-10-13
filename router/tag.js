const express = require("express");

const router = express.Router();

// 获取文章标签列表
router.get("/", (req, res, next) => {
  try {
    res.send("get /");
  } catch (err) {
    next(err);
  }
});

module.exports = router;
