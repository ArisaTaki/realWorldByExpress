# RealWorldDemoByExpress
使用express开发接口的realworld论坛demo

## RESTful接口设计规范
### 协议
API与用户的通信协议，尽量使用https

### 域名
应该尽量将API部署在专用域名之下
> ` https://api.example.com`

如果确定API很简单，不会有进一步的扩展，可以考虑放在主域名之下
> `https://example.org/api`

### 版本
应该将API的版本号放入URL
> `https://api.example.com/v1`

另一种做法就是，将版本号放在HTTP头信息中，但不如放入URL方便直观，github上采用的就是这一种做法

### 路径
路径又称之为终点（endpoint），表示API的具体网址
在RESTful架构中，每个网址代表一种资源（resource），所以网址中不能有动词，只有名词，并且所使用的名词往往与数据库的表格名对应，一般来说数据库的表都是同种记录的集合（collection），所以API的名词都是用的复数

eg.有一个API提供的动物园信息，包括了雇员，动物等等
- https://api.example.com/v1/zoos
- https://api.example.com/v1/animals
- https://api.example.com/v1/employees

### HTTP 动词
对于资源的具体操作类型，由HTTP动词表示。

常用的HTTP动词有下面五个（括号里是对应的SQL命令）。
- GET（读取）：从服务器取出资源（一项或多项）。
- POST（创建）：在服务器新建一个资源。
- PUT（完整更新）：在服务器更新资源（客户端提供改变后的完整资源）。
- PATCH（部分更新）：在服务器更新资源（客户端提供改变的属性）。
- DELETE（删除）：从服务器删除资源。

还有两个不常用的HTTP动词。
- HEAD：获取资源的元数据。
- OPTIONS：获取信息，关于资源的哪些属性是客户端可以改变的。

下面是一些例子。
- GET /zoos：列出所有动物园
- POST /zoos：新建一个动物园
- GET /zoos/ID：获取某个指定动物园的信息
- PUT /zoos/ID：更新某个指定动物园的信息（提供该动物园的全部信息）
- PATCH /zoos/ID：更新某个指定动物园的信息（提供该动物园的部分信息）
- DELETE /zoos/ID：删除某个动物园
- GET /zoos/ID/animals：列出某个指定动物园的所有动物
- DELETE /zoos/ID/animals/ID：删除某个指定动物园的指定动物

### 过滤信息
如果记录数量很多，服务器不可能都将它们返回给用户。API应该提供参数，过滤返回结果。
下面是一些常见的参数。
- ?limit=10：指定返回记录的数量
- ?offset=10：指定返回记录的开始位置。
- ?page=2&per_page=100：指定第几页，以及每页的记录数。
- ?sortby=name&order=asc：指定返回结果按照哪个属性排序，以及排序顺序。
- ?animal_type_id=1：指定筛选条件

参数的设计允许存在冗余，即允许API路径和URL参数偶尔有重复。比如，GET /zoo/ID/animals 与 GET /animals?zoo_id=ID 的含义是相同的。

### 状态码
客户端的每一次请求，服务器都必须给出回应。回应包括 HTTP 状态码和数据两部分。

HTTP 状态码就是一个三位数，分成五个类别。
- 1xx：相关信息
- 2xx：操作成功
- 3xx：重定向
- 4xx：客户端错误
- 5xx：服务器错误

这五大类总共包含100多种状态码，覆盖了绝大部分可能遇到的情况。每一种状态码都有标准的（或者约定的）解释，客户端只需查看状态码，就可以判断出发生了什么情况，所以服务器应该返回尽可能精确的状态码。

常见的有以下一些（方括号中是该状态码对应的 HTTP 动词）。

- 200 OK - [GET]：服务器成功返回用户请求的数据，该操作是幂等的（Idempotent）。
- 201 CREATED - [POST/PUT/PATCH]：用户新建或修改数据成功。
- 202 Accepted - [*]：表示一个请求已经进入后台排队（异步任务）
- 204 NO CONTENT - [DELETE]：用户删除数据成功。
- 400 INVALID REQUEST - [POST/PUT/PATCH]：用户发出的请求有错误，服务器没有进行新建或修改数据的操作，该操作是幂等的。
- 401 Unauthorized - [*]：表示用户没有权限（令牌、用户名、密码错误）。
- 403 Forbidden - [*] 表示用户得到授权（与401错误相对），但是访问是被禁止的。
- 404 NOT FOUND - [*]：用户发出的请求针对的是不存在的记录，服务器没有进行操作，该操作是幂等的。
- 406 Not Acceptable - [GET]：用户请求的格式不可得（比如用户请求JSON格式，但是只有XML格式）。
- 410 Gone -[GET]：用户请求的资源被永久删除，且不会再得到的。
- 422 Unprocesable entity - [POST/PUT/PATCH] 当创建一个对象时，发生一个验证错误。
- 500 INTERNAL SERVER ERROR - [*]：服务器发生错误，用户将无法判断发出的请求是否成功。

状态码的完全列表参见这里。

### 返回结果
API 返回的数据格式，不应该是纯文本，而应该是一个 JSON 对象，因为这样才能返回标准的结构化数据。所以，服务器回应的 HTTP 头的 Content-Type 属性要设为 application/json。

针对不同操作，服务器向用户返回的结果应该符合以下规范。

- GET /collection：返回资源对象的列表（数组）
- GET /collection/resource：返回单个资源对象
- POST /collection：返回新生成的资源对象
- PUT /collection/resource：返回完整的资源对象
- PATCH /collection/resource：返回完整的资源对象
- DELETE /collection/resource：返回一个空文档

### 错误处理
有一种不恰当的做法是，即使发生错误，也返回200状态码，把错误信息放在数据体里面，就像下面这样。
```
HTTP/1.1 200 OK
Content-Type: application/json

{
  "status": "failure",
  "data": {
    "error": "Expected at least two items in list."
  }
}
```
上面代码中，解析数据体以后，才能得知操作失败。

这种做法实际上取消了状态码，这是完全不可取的。正确的做法是，状态码反映发生的错误，具体的错误信息放在数据体里面返回。下面是一个例子。
```
HTTP/1.1 400 Bad Request
Content-Type: application/json

{
  "error": "Invalid payoad.",
  "detail": {
     "surname": "This field is required."
  }
}
```

### 身份认证
基于 JWT 的接口权限认证：
- 字段名：Authorization
- 字段值：Bearer token数据

### 跨域处理
可以在服务端设置 CORS 允许客户端跨域资源请求。

### 参考链接
- http://www.ruanyifeng.com/blog/2014/05/restful_api.html
- https://www.ruanyifeng.com/blog/2018/10/restful-api-best-practices.html
- https://www.zhihu.com/question/28557115


# 项目目录结构
```
.
├── config	# 配置文件
│   └── config.default.js
├── controller	# 用于解析用户的输入，处理后返回相应的结果
├── model	# 数据持久层
├── middleware	# 用于编写中间件
├── router	# 用于配置 URL 路由规则
├── util	# 工具模块
└── app.js	# 用于自定义启动时的初始化工作
```

## 配置常用中间件
- 解析请求体
  - express.json()
  - express.urlencoded()
- 日志输出
  - morgan()
- 为客户端提供跨域资源请求
  - cors()

## 路由设计
参考：
> https://github.com/gothinkster/realworld/tree/master/api

- 用户相关
- 文章相关
- 标签相关