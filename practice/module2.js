function hello() {
  console.log("hello");
}

function World() {
  console.log("hello");
}

module.exports = {
  hello: hello,
  World:World
}

// exports.hello = hello
// exports.World = World

// node.js导出module.exports这个属性.
// module.exports这个属性默认指向一个空对象.
// exports也指向这个空对象.
// 所以exports只是module.exports这个属性的引用
// 所以任何修改exports的指向的行为,都会导致对应的导出失效.比如 exports={} exports = ()=>{}

// 那么为什么在自己的 .js 文件中写成exports = { … }会没有效果呢 ?

// 系统自动给node.js 文件增加2个变量 exports 和 module, module 又有一个属性 exports, 这个exports 属性指向一个空对象 {}; 同时 exports这个变量也指向了这个空对象{};

// 于是就有了 exports => {} <=module.exports。

// 这2个exports 其实是没有直接关系的,唯一的关系是: 他们初始都指向同一个空对象{};
// 如果其中一个不指向这个空对象了, 那么他们的关系就没有了. 因此也就没有任何效果了.

var load = function (exports, module) {
  return module.exports;
}
var exported = load(module.exports, module)
// 首先，Node会把整个待加载的.js文件放入一个包装函数load中执行。
// 在执行这个load()函数前，Node事先准备好了module对象.module中有一个空的exports方法。

console.log(exports == module.exports, "exports是否等于module.exports");


