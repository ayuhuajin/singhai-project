const mongoose = require('mongoose');
let DemoScheme = new mongoose.Schema({
  title:String, //标题
  name:String, // 名称
  year:String, // 年度
  desc:String, // 描述
  content:String, // 内容
  time:String,  //时间
  updateTime:String // 更新时间
});

let demo = mongoose.model('demo',DemoScheme,'demo');
module.exports = demo;
