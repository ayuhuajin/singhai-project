// load nodemailer as follows
// npm install nodemailer --save
var nodemailer = require('nodemailer');
// create reusable transporter object using SMTP transport
var transporter = nodemailer.createTransport({
    "host": "smtpdm.aliyun.com",
    "port": 25,
    //"secureConnection": true, // use SSL, the port is 465
    "auth": {
        "user": 'singhai@email.wulilang.com', // user name
        "pass": 'SSMMttpp1122'         // password
    }
});
// NB! No need to recreate the transporter object. You can use
// the same transporter object for all e-mails
// setup e-mail data with unicode symbols
var mailOptions = {
    from: 'singhai@email.wulilang.com', // sender address mailfrom must be same with the user
    to: '455493143@qq.com', // list of receivers
    subject: 'Hello', // Subject line
    text: 'Hello world', // plaintext body
    replyTo:'xxxxx@xxxxx.com',//custom reply address
    html:'<b>Hello world</b><img src="cid:01" style="width:200px;height:auto">', // html body
    attachments: [
    ],
};
// send mail with defined transport object
transporter.sendMail(mailOptions, function(error, info){
    if(error){
        return console.log(error);
    }
    console.log('Message sent: ' + info.response);
});

console.log(1234);
