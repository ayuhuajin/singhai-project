const Koa = require('koa');
const app = new Koa();
const cors =require('koa2-cors');
const bodyParser = require('koa-bodyparser');
const router = require('./router/index')
require('./utils/mongo');

app.use(cors());
// parse request body:
app.use(bodyParser());  //bodypaser要在router之前加载才能生效。
router(app);  //传递app 参数

app.listen(3000);
console.log('[demo] start-quick is starting at port 3000');
