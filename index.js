const Koa = require('koa');
const path = require('path');
const app = new Koa();
const cors = require('koa2-cors');
const koajwt = require('koa-jwt');

const bodyParser = require('koa-bodyparser');
const static = require('koa-static'); // 引入静态资源中间件
const router = require('./router/index')
require('./utils/mongo');
const whiteApi = require('./config/whiteApi')


// 指定当前静态资源的文件夹
app.use(static(path.join(__dirname,'./static')));

app.use(cors());
// parse request body:
app.use(bodyParser());  //bodypaser要在router之前加载才能生效。

// 错误处理 返回401 中间件对token进行验证
app.use((ctx, next) => {
  return next().catch((err) => {
      if(err.status === 401){
          ctx.status = 401;
        ctx.body = 'Protected resource, use Authorization header to get access\n';
      }else{
          throw err;
      }
  });
});

// 启用koajwt
app.use(koajwt({
  secret: 'my_token'
}).unless({
  path: ['/ali/sendEmail','/login'] // 不用进行授权的接口,
}));

router(app);  //传递app 参数
app.listen(12306);
console.log('[demo] start-quick is starting at port 12306');
