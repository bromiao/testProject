/*Function.prototype.bind = function(context) {
  var self = this;

  return function () {
    return self.call(context, arguments);
  }
};

var obj = {
  name: 'Jack'
};

var test = function () {
  console.log(this.name)
}.bind(obj);

test();



var A = function(name) {
  this.name = name;
}

var B = function() {
  A.apply(this, arguments);
}

B.prototype.getName = function() {
  return this.name;
}

var b = new B('microzz');
console.log(b.getName()); // microzz


function isArray(obj){
  return Object.prototype.toString.call(obj) === '[object Array]';
}
isArray([]) // true
isArray('qianlong') // false*/

function Cat() {

}

Cat.prototype = {
  food: 'fish',
  say: function () {
    console.log('I love ' + this.food);
  }
};

var bullDog = {
  food: 'bone'
}

var coffeeCat = new Cat();

var obj = {0:'aa',1:'bb',2:'cc',length:3};
Array.prototype.slice.call(obj); // ['aa','bb','cc']

//背景介绍：在 javascript 中，call 和 apply都是为了改变某个函数运行时的上下文（context）而存在的，换句话说，就是为了改变函数体内部 this 的指向。
//JavaScript 的一大特点是，函数存在「定义时上下文」和「运行时上下文」以及「上下文是可以改变的」这样的概念。

//所以，可以看出call和apply是为了动态改变this而出现的，
// 当一个object没有某个方法，但是其他的有，我们可以借助call或apply用其它对象的方法来操作。 --------> 方法.call/apply(操作方法的目标对象)
coffeeCat.say.call(bullDog)

//设置元素样式
function changeStyle(attr, value){
  this.style[attr] = value;
}
var xx = document.getElementById('xx');
changeStyle.call(xx, "height", "200px");

//实现对象继承
var Human = function () {
  this.name = 'Galen';
  this.age = 18
};

var person = {};

Human.call(person);
console.log(person); //{name: "Galen", age: 18}



//获取数组中最大，最小值
var arr = [1,23,134,2,-5,10];
Math.max.apply(Math, arr)
Math.min.apply(Math, arr)
