## singhai-project

## 项目启动
---
## 插件介绍
---
### git
***
> git branch -M main 的作用
master 分支改名为main 

1.**[koa2](https://koa.bootcss.com/)**
koa2框架是一个基于中间件的框架，也就是说，需要使用到的功能，比如路由(koa-router)，日志(koa-logger)，都可以找到相应的中间件库，即npm包，然后通过app.use(...)引进来。

*[mongodb](https://www.mongodb.com/)*

*[mongoose](http://www.mongoosejs.net/)*

```javascript
const mongoose = require('mongoose');
mongoose.connect('mongodb://用户名:密码@IP地址/数据库名称');
mongoose.connection.on('error', function (error) {
  console.log('数据库连接失败：' + error);
});
mongoose.connection.on('open', function () {
  console.log('------数据库连接成功！------');
});
```
`utils/mongo.js` 不上传避免密码泄露

*[@koa/router](https://www.npmjs.com/package/koa-router)*
== @koa/router，这个中间件是挂在Koa官方名下的，他跟另一个中间件koa-router名字很像。其实@koa/router是fork的koa-router，~~因为koa-router的作者很多年没维护了~~，所以Koa官方将它fork到了自己名下进行维护。==

<font color="#4ea1db">koa-bodyparser:</font>

使用koa-bodyparser就可以通过到ctx.request.body来获取post过来的参数了,否则 ctx.request.body 为undefind

koa-static静态资源中间件

1.在当前项目下创建static文件夹，当前在文件件下建立了一个image文件夹，其中增加一图片,css,html,js 同理
浏览器输入地址http://localhost:3000/image/tes.jpeg

https://www.jianshu.com/p/33f00f98343d

busboy
实现文件上传

*jsonwebtoken* 使用jsonwebtoken生成、验证token,用于签发、解析token
