const { Article } = require('../model')

// 获取文章列表
exports.getArticles = async (req, res, next) => {
  try {
    // 处理请求
    res.send("get /");
  } catch (err) {
    next(err);
  }
};

// 获取用户关注的作者文章列表
exports.getFollowedArticles = async (req, res, next) => {
  try {
    // 处理请求
    res.send("get /feed");
  } catch (err) {
    next(err);
  }
};

// 获取文章
exports.getArticle = async (req, res, next) => {
  try {
    res.send("get /:articleId");
  } catch (err) {
    next(err);
  }
};

// 创建文章
exports.createArticle = async (req, res, next) => {
  try {
    const article = new Article(req.body.article)
    article.author = req.user._id
    // 将key为author的数据写入article发送给客户端
    await article.populate('author')
    await article.save()
    res.status(201).json({
      article
    })
  } catch (err) {
    next(err);
  }
};

// 更新文章
exports.updateArticle = async (req, res, next) => {
  try {
    // 处理请求
    res.send("put /:articleId");
  } catch (err) {
    next(err);
  }
};

// 删除文章
exports.deleteArticle = async (req, res, next) => {
  try {
    // 处理请求
    res.send("delete /:articleId");
  } catch (err) {
    next(err);
  }
};

// 添加文章评论
exports.addArticleComment = async (req, res, next) => {
  try {
    // 处理请求
    res.send("post /:articleId/comments");
  } catch (err) {
    next(err);
  }
};

// 获取文章评论列表
exports.getComments = async (req, res, next) => {
  try {
    // 处理请求
    res.send("get /:articleId/comments");
  } catch (err) {
    next(err);
  }
};

// 删除评论
exports.deleteComment = async (req, res, next) => {
  try {
    // 处理请求
    res.send("delete /:articleId/comments/:id");
  } catch (err) {
    next(err);
  }
};

// 点赞
exports.likeArticle = async (req, res, next) => {
  try {
    // 处理请求
    res.send("post /:articleId/favorite");
  } catch (err) {
    next(err);
  }
};

// 取消点赞
exports.unLikeArticle = async (req, res, next) => {
  try {
    // 处理请求
    res.send("delete /:articleId/favorite");
  } catch (err) {
    next(err);
  }
};
