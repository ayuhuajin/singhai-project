const Koa = require('koa');
const path = require('path');
const app = new Koa();
const cors =require('koa2-cors');
const bodyParser = require('koa-bodyparser');
const static = require('koa-static'); // 引入静态资源中间件
const router = require('./router/index')
require('./utils/mongo');

// 指定当前静态资源的文件夹
app.use(static(path.join(__dirname,'./static')));

// app.use(cors());
// parse request body:
app.use(bodyParser());  //bodypaser要在router之前加载才能生效。
router(app);  //传递app 参数

app.listen(3000);
console.log('[demo] start-quick is starting at port 3000');
