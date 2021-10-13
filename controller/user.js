// 用户注册
exports.register = async (req, res, next) => {
  try {
    // 处理请求
    res.send("post /users");
  } catch (err) {
    next(err);
  }
};

// 用户登录
exports.login = async (req, res, next) => {
  try {
    // 处理请求
    res.send("post /users/login");
  } catch (err) {
    next(err);
  }
};

// 获取当前登录用户
exports.getCurrentUser = async (req, res, next) => {
  try {
    // 处理请求
    res.send("get /user");
  } catch (err) {
    next(err);
  }
};

// 更新当前登录用户
exports.updateCurrentUser = async (req, res, next) => {
  try {
    // 处理请求
    res.send("put /user");
  } catch (err) {
    next(err);
  }
};
