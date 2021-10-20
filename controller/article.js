const { Article, User, Comments, Favorite} = require('../model')

// 获取文章列表
exports.getArticles = async (req, res, next) => {
  try {
    const {
      limit = 20,
      offset = 0,
      tag,
      author,
    } = req.query

    const filter = {}

    // 筛选tag
    if (tag) {
      filter.tagList = tag
    }

    if (author) {
      const user = await User.findOne({username: author})
      filter.author = user ? user._id : null
    }

    const articlesCount = await Article.countDocuments()
    const articles = await Article.find(filter)
        //跳过多少条
        .skip(Number.parseInt(offset))
        //取多少条
        .limit(Number.parseInt(limit))
        .populate('author')
        .sort({
          // -1 表示倒叙，1 表示升序
          createdAt: -1
        })
    res.status(200).json({
      articles,
      articlesCount
    })
    // 处理请求
  } catch (err) {
    next(err);
  }
};

// 获取用户关注的作者文章列表
exports.getFollowedArticles = async (req, res, next) => {
  try {
    // 处理请求
    const user = req.user
    // console.log(user)
    const articles = await Article.find({ author: user._id })
    articles.map(item => {
      item.author = user
    })
    res.status(200).json({
      articles,
      counts: articles.length
    })
  } catch (err) {
    next(err);
  }
};

// 获取文章
exports.getArticle = async (req, res, next) => {
  try {
    const article = req.article
    res.status(200).json({
      article
    });
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
    const article = req.article
    const bodyArticle = req.body.article
    article.title = bodyArticle.title || article.title
    article.description = bodyArticle.description || article.description
    article.body = bodyArticle.body || article.body

    await article.save()
    res.status(200).json({
      article
    })
  } catch (err) {
    next(err);
  }
};

// 删除文章
exports.deleteArticle = async (req, res, next) => {
  try {
    // 处理请求
    const article = req.article
    await article.remove()
    res.status(204).end()
  } catch (err) {
    next(err);
  }
};

// 添加文章评论
exports.addArticleComment = async (req, res, next) => {
  try {
    // 处理请求
    const article = req.article
    let comment = new Comments({
      article: article._id,
      user: req.user._id,
      comment: req.body.comment.body
    })
    // 发布完评论后将文章和发布评论人都发送给客户端
    await comment.populate(['article', 'user'])
    await comment.save()
    res.status(200).json({
      comment
    })
  } catch (err) {
    next(err);
  }
};

// 获取文章评论列表
exports.getComments = async (req, res, next) => {
  try {
    // 处理请求
    const article = req.article
    const comments = await Comments.find({ article: article._id })
    let commentsInfos = []
    for (let i = 0; i < comments.length; i++) {
      commentsInfos.push({
        _id: comments[i]._id,
        user: await User.findOne( {_id: comments[i].user}),
        comment: comments[i].comment
      })
    }
    console.log(commentsInfos)
    res.status(200).json({
      comments: commentsInfos
    })
  } catch (err) {
    next(err);
  }
};

// 删除评论
exports.deleteComment = async (req, res, next) => {
  try {
    // 处理请求
    const comment = req.comment
    await comment.remove()
    res.status(204).end()
  } catch (err) {
    next(err);
  }
};

// 点赞
exports.likeArticle = async (req, res, next) => {
  try {
    const article = await Article.findOne({ _id: req.params.articleId })
    const user = req.user
    let favorite = new Favorite({
      article: article._id,
      user: user._id
    })

    await favorite.populate(['article', 'user'])
    await favorite.save()
    // 这里返回的数据里有不同步更新的counts，不发送这条数据给客户端
    favorite = favorite.toJSON()
    delete favorite.article.favoritesCount
    article.favoritesCount += 1

    article.save()
    res.status(200).json({
      favorite
    })
  } catch (err) {
    next(err);
  }
};

// 取消点赞
exports.unLikeArticle = async (req, res, next) => {
  try {
    // 处理请求
    const article = req.article
    const favorite = req.favorite
    await favorite.remove()

    article.favoritesCount -= 1

    article.save()
    res.status(204).end()
  } catch (err) {
    next(err);
  }
};
