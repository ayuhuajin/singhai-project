
const company = require('../mongo/company');
module.exports={
  companyList:async(ctx)=>{
    let total,result;
    let limit =ctx.query.pageSize||10;
    let currentPage =ctx.query.pageNumber||1;
    total = await company.find({});
    result = await company.find({}).skip((parseInt(currentPage)-1)*parseInt(limit)).limit(parseInt(limit));
    ctx.response.body = {
      total:total.length,
      data:result
    };
  },
  // 添加公司
  addCompany:async(ctx)=>{
    let list = ctx.request.body
    // list.forEach(obj=> {

    // });
    // console.log(ctx.request.body,666777888);
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
      natureOfBusiness
    } = ctx.request.body[0]
    console.log(companyName,999988877);
    try{
      await company.create({
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
        natureOfBusiness
      });
      ctx.response.body = '成功添加公司';
    } catch(err) {
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
      natureOfBusiness
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
      natureOfBusiness}};
    try{
      await company.update(conditions, update);
      ctx.response.body = '编辑成功';
    }catch(err){
      ctx.response.body='编辑出错';
    }
  },
}
