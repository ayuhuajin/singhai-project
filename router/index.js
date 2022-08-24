const Router = require('@koa/router');
const router = new Router();
const demo = require('../controller/demo');
const shop = require('../controller/shop');
const user = require('../controller/user');
const email = require('../controller/email');

module.exports=(app)=>{
  // log request URL:
  app.use(async (ctx, next) => {
    const start = Date.now();
    const ms = Date.now() - start;
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...- ${ms}ms`);
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Methods', 'PUT,DELETE,POST,GET');
    ctx.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    await next();
  });

  // ****************************  DEMO START  **********************************//
  router.get('/demoList',demo.demoList);
  router.post('/addDemo',demo.addDemo);
  router.delete('/delDemo',demo.delDemo);
  router.put('/updateDemo',demo.updateDemo);
  router.get('/getDemoById',demo.getDemoById);
  router.post('/upload/:type',demo.uploadFile);

  // ****************************  DEMO END  **********************************//

  // ****************************  USER AND LOGIN START  **********************************//
  router.post('/login',user.login);
  router.get('/userList',user.userList);
  router.post('/addUser',user.addUser);
  router.post('/delUser',user.delUser);
  router.post('/updateUser',user.updateUser);
  router.get('/userView',user.userView);

  // ****************************  USER AND LOGIN END  **********************************//


  // ****************************  SEND EMAIL START  **********************************//

  router.post('/ali/sendEmail',email.sendEmail);

  // ****************************  SEND EMAIL END  **********************************//


  // ****************************  商品,增,删,改,查  **********************************//
  router.get('/shop/shopList',shop.shopList);

  app.use(router.routes());   /*启动路由*/
  app.use(router.allowedMethods());
}
