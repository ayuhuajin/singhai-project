const user = require('../mongo/user');
const jwt = require('jsonwebtoken');
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
    mailOptions = data
    console.log(data,12354,mailOptions);
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
