
const company = require('../mongo/company');
module.exports={
  companyList:async(ctx)=>{
    let total,result;
    let limit =ctx.query.pageSize||10;
    let currentPage =ctx.query.pageNumber||1;
    let {isSend,haveWebsite,havePhone,haveEmail} = ctx.request.body
    // console.log(isSend,haveWebsite,havePhone,haveEmail);
    // let options = {$and:[]}
    // if(isSend) {
    //   let kk = {isSend:{'$eq':isSend}})
    //   options.$and.push(kk)
    // }
    // if(options.$and.length==0) {
    //   options={}
    // }
    // console.log(options,666);
    // console.log(list,898);
    // let isSend =ctx.query.isSend || false
    // let isSend =ctx.query.isSend || false
    // let isSend =ctx.query.isSend || false
    // console.log(website,1234);
    // if(website=='') {
    //   console.log(123);
    //   total = await company.count({})
    // } else {
    //   if(website) {
    //     total = await company.count({website:{$ne:'-'}})
    //   } else {
    //     total = await company.count({website:{$eq:'-'}})
    //   }
    // }
    // total = await company.count({});

    // {$and:[{haveWebsite:{$eq:haveWebsite}},{havePhone:{$eq:havePhone}},{haveEmail:{$eq:haveEmail}}]}
    total = await company.find().count()
    // console.log(total);
    result = await company.find({}).skip((parseInt(currentPage)-1)*parseInt(limit)).limit(parseInt(limit));
    ctx.response.body = {
      total:total,
      data:result
    };
  },
  // 添加公司
  addCompany:async(ctx)=>{
    let list = ctx.request.body
    // list.forEach(obj=> {

    // });
    // console.log(ctx.request.body,666777888);
    // let {
    //   companyName,
    //   operatingStatus,
    //   legalPerson,
    //   registeredCapital,
    //   paidInCapital,
    //   dateOfIncorporation,
    //   approvalDate,
    //   businessTerm,
    //   province,
    //   city,
    //   county,
    //   unifiedSocialCreditCode,
    //   TINumber,
    //   registrationNumber,
    //   organizationCode,
    //   numberOfInsured,
    //   companyType,
    //   industry,
    //   NameUsedBefore,
    //   registeredAddress,
    //   newAddress,
    //   website,
    //   phone,
    //   otherPhone,
    //   email,
    //   otherEmail,
    //   natureOfBusiness,
    //   remark,
    //   sendNum
    // } = ctx.request.body[0]
    // console.log(companyName,999988877);
    try{
      // async function getAll(){
      //   for(item of list) {
      //     let result = await company.find({ 'companyName': item.companyName });
      //     console.log(result,34567);
      //     if(result.length ===0) {
      //       await company.create(item);
      //     }
      //   }
      // }
      // await getAll()
      // let p =  new Promise((resolve, reject) => {
      //     setTimeout(()=>{
      //       resolve()
      //     },3000)
      // })
      // await p


       let p = new Promise(async (resolve,reject)=>{
        for([index,item] of list.entries()) {
          let result = await company.find({ 'companyName': item.companyName });
          if(result.length ===0) {
            await company.create(item);
          }
        }
      })
      await p();
      ctx.response.body = '成功添加公司';
    } catch(err) {
      console.log(err,1234);
      ctx.body = '出错';
    }
  },
  // 删除公司
  delCompany:async(ctx)=>{
    let id = ctx.request.body.id;
    try{
      await company.deleteOne({'_id':id});
      ctx.response.body = '删除成功';
    } catch(e) {
      ctx.response.body = '删除失败';
    }
  },
  // 公司详情
  companyView:async(ctx)=>{
    let id = ctx.query.id;
    let conditions = { '_id': id };
    let result = await company.find(conditions);
    ctx.response.body = result;
  },
   // 修改公司信息
  updateCompany:async(ctx)=>{
    let {
      companyName,
      operatingStatus,
      legalPerson,
      registeredCapital,
      paidInCapital,
      dateOfIncorporation,
      approvalDate,
      businessTerm,
      province,
      city,
      county,
      unifiedSocialCreditCode,
      TINumber,
      registrationNumber,
      organizationCode,
      numberOfInsured,
      companyType,
      industry,
      NameUsedBefore,
      registeredAddress,
      newAddress,
      website,
      phone,
      otherPhone,
      email,
      otherEmail,
      natureOfBusiness,
      remark,
      sendNum
    } = ctx.request.body
    let id = ctx.request.body.id || '';
    console.log(123123,companyName,id);

    var conditions = {'_id' : id};
    var update = {$set : { companyName,
      operatingStatus,
      legalPerson,
      registeredCapital,
      paidInCapital,
      dateOfIncorporation,
      approvalDate,
      businessTerm,
      province,
      city,
      county,
      unifiedSocialCreditCode,
      TINumber,
      registrationNumber,
      organizationCode,
      numberOfInsured,
      companyType,
      industry,
      NameUsedBefore,
      registeredAddress,
      newAddress,
      website,
      phone,
      otherPhone,
      email,
      otherEmail,
      natureOfBusiness,
      remark,
      sendNum
    }};
    try{
      await company.update(conditions, update);
      ctx.response.body = '编辑成功';
    }catch(err){
      ctx.response.body='编辑出错';
    }
  },
}


// db.getCollection("company").find({companyName:'厦门普华天元咨询管理有限公司'},{}) //获取公司名称为厦门普华天元咨询管理有限公司
// db.getCollection("company").find({sendNum:{$eq:10}},{})   // 获取==10
// db.getCollection("company").find({sendNum:{$in:[10,15]}},{})  // 获取 10,15
// db.getCollection("company").distinct("companyName")   //获取公司名称集合  并去重

// db.getCollection("company").find({companyName:{$exists:true}})   //$exists 查询某字段是否为空的数据
// 查询sendnum ===10 或者otherphone ==13686888777
// db.getCollection("company").find({$or:[{sendNum:{$eq:10}},{otherPhone:{$eq:'13686888777'}}]})

// 查询sendnum ===10 并且otherphone ==15396276106
// db.getCollection("company").find({$and:[{sendNum:{$eq:10}},{otherPhone:{$eq:'15396276106'}}]})
// 查找大于2019 小于2018的值
// Model.find({ year: { $gt: 2019, $lt: 2018 } });

// sort	排序
// skip	跳过
// limit	限制
// select	显示字段
// exect	执行
// count	计数
// distinct	去重
