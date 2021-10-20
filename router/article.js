const express = require("express");
const articleCtrl = require("../controller/article");
const articleValidate = require('../validator/article')
const auth = require('../middleware/auth')
const router = express.Router();

// 获取文章列表
router.get("/", articleCtrl.getArticles);

// 获取不同用户的文章列表
router.get("/:username", articleValidate.getUserArticle, articleCtrl.getFollowedArticles);

// 获取文章
router.get("/:articleId", articleValidate.getArticle, articleCtrl.getArticle);

// 创建文章
router.post("/", auth, articleValidate.createArticle, articleCtrl.createArticle);

// 更新文章
router.put("/:articleId", auth, articleValidate.updateArticle, articleCtrl.updateArticle);

// 删除文章
router.delete("/:articleId", auth, articleValidate.deleteArticle ,articleCtrl.deleteArticle);

// 添加文章评论
router.post("/:articleId/comments", auth, articleValidate.addComment, articleCtrl.addArticleComment);

// 获取文章评论列表
router.get("/:articleId/comments", articleValidate.getComments ,articleCtrl.getComments);

// 删除文章评论
router.delete("/:commentId/comments", auth ,articleValidate.deleteComments, articleCtrl.deleteComment);

// 文章点赞
router.post("/:articleId/favorite", articleCtrl.likeArticle);

// 取消文章点赞
router.delete("/:articleId/favorite", articleCtrl.unLikeArticle);

module.exports = router;
