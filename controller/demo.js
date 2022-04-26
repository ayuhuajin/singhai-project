const demo = require('../mongo/demo');
module.exports={
  // demo 列表
  demoList:async(ctx)=>{
    let total,result;
    let limit =ctx.query.pageSize||10;
    let currentPage =ctx.query.pageNumber||1;
    total = await demo.find({});
    result = await demo.find({},{shopSecret:0}).sort({'time':-1}).skip((parseInt(currentPage)-1)*parseInt(limit)).limit(parseInt(limit));
    ctx.response.body = {
      total:total.length,
      data:result
    };
  },
  // 添加demo
  addDemo:async(ctx)=>{
    let obj = ctx.request.body || {}
    console.log(ctx.request.body,34534 );
    const {title="",name="",year="",desc="",content=""} = obj
    try{
      await demo.create({'title':title,'name':name,'year':year,'desc':desc,'content':content});
      ctx.response.body = '成功添加demo';
    } catch(err) {
      ctx.body = '出错';
    }
  },
  // 删除demo
  delDemo:async(ctx)=>{
    console.log(ctx.request);
    let id = ctx.request.body.id;
    console.log(id,1234);
    try{
      await demo.deleteOne({'_id':id});
      ctx.response.body = '删除成功';
    } catch(e) {
      console.log(e,8989);
      ctx.response.body = '删除失败';
    }
  },
  // 修改demo
  updateDemo:async(ctx)=>{
    let {title,content,id} = ctx.request.body||{}
    var conditions = {'_id' : id};
    var update = {$set : { 'title' : title,'content' : content}};
    try{
      await demo.updateOne(conditions, update);
      ctx.response.body = '编辑成功';
    }catch(err){
      ctx.response.body='编辑出错';
    }
  },
  // 获取指定demo
  getDemoById:async(ctx)=>{
    let id = ctx.query.id;
    let conditions = { '_id': id };
    let result = await demo.find(conditions);
    ctx.response.body = result;
  },
  uploadFile:async(ctx)=>{
    ctx.response.body = "上传附件"
  }
}
