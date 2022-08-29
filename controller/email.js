const company = require('../mongo/company');
const nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
  "host": "smtpdm.aliyun.com", //SMTP服务地址
  "port": 80,
  //"secureConnection": true, // use SSL, the port is 465
  "auth": {
      "user": 'singhai@email.wulilang.com', // user name
      "pass": 'SSMMttpp1122'         // password
  }
});
var mailOptions = {
  from: 'singhai@email.wulilang.com', // sender address mailfrom must be same with the user
  to: '455493143@qq.com', // list of receivers
  replyTo:'xxxxx@xxxxx.com',//custom reply address
  subject: 'Hello', // Subject line
  text: 'Hello world', // plaintext body
  html:'<b>Hello world</b><img src="cid:01" style="width:200px;height:auto">', // html body
  attachments: [
  ],
};

module.exports={
  sendEmail:async(ctx)=>{
    let data = ctx.request.body;
    let id = data.companyId
    mailOptions = data
    // console.log(data,12354,mailOptions);
    var conditions = {'_id' : id};
    let result = await company.find(conditions);
    // console.log(result[0].sendNum,88888999);
    let sendNum = result[0].sendNum + 1
    console.log(sendNum,"dddddzjegddd");
    var update = {$set : {
      sendNum
    }};
    try{
      await company.update(conditions, update);
      ctx.response.body = '编辑成功';
    }catch(err){
      ctx.response.body='编辑出错';
    }
    ctx.response.body = '成功';
    return
    transporter.sendMail(mailOptions, function(error, info){
      if(error){
        return console.log(error);
      }
      console.log('Message sent: ' + info.response);
      ctx.response.body = '成功';
    });
  },
};
