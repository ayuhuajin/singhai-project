
const shop = require('../mongo/shop');
module.exports={
  shopList:async(ctx)=>{
    let total,result;
    let limit =ctx.query.pageSize||10;
    let currentPage =ctx.query.pageNumber||1;
    total = await shop.find({});
    result = await shop.find({},{shopSecret:0}).sort({'time':-1}).skip((parseInt(currentPage)-1)*parseInt(limit)).limit(parseInt(limit));
    ctx.response.body = {
      total:total.length,
      data:result
    };
  }
}
