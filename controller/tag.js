// 获取文章标签列表
exports.getTags = async (req, res, next) => {
  try {
    res.send("get /");
  } catch (err) {
    next(err);
  }
};
