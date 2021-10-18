const express = require("express");
const articleCtrl = require("../controller/article");
const auth = require('../middleware/auth')
const router = express.Router();

// 获取文章列表
router.get("/", articleCtrl.getArticles);

// 获取用户关注的作者文章列表
router.get("/feed", articleCtrl.getFollowedArticles);

// 获取文章
router.get("/:articleId", articleCtrl.getArticle);

// 创建文章
router.post("/", auth, articleCtrl.createArticle);

// 更新文章
router.put("/:articleId", articleCtrl.updateArticle);

// 删除文章
router.delete("/:articleId", articleCtrl.deleteArticle);

// 添加文章评论
router.post("/:articleId/comments", articleCtrl.addArticleComment);

// 获取文章评论列表
router.get("/:articleId/comments", articleCtrl.getComments);

// 删除文章评论
router.delete("/:articleId/comments/:id", articleCtrl.deleteComment);

// 文章点赞
router.post("/:articleId/favorite", articleCtrl.likeArticle);

// 取消文章点赞
router.delete("/:articleId/favorite", articleCtrl.unLikeArticle);

module.exports = router;
