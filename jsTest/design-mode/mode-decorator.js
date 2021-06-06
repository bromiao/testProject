/*用 AOP 装饰函数*/
Function.prototype.before = function (beforeFn) {
  const _self = this;
  return function () {
    beforeFn.apply(this, arguments);

    return _self.apply(this, arguments);
  }
}

Function.prototype.after = function (afterFn) {
  const _self = this;
  return function () {
    const ret = _self.apply(this, arguments);
    afterFn.apply(this, arguments);

    return ret;
  }
}

window.onload = function(){
  alert (1);
}
window.onload = ( window.onload || function(){} ).after(function(){
  alert (2);
}).after(function(){
  alert (3);
}).after(function(){
  alert (4);
});


/*用 AOP 装饰函数-----把原函数和新函数都作为参数传入before 或者 after 方法*/
const before = function (fn, beforeFn) {
  return function () {
    beforeFn.apply(this, arguments);
    fn.apply(this, arguments);
  }
}

let a = before(
  function () {alert(3)},
  function () {alert(2)}
);

a = before(a, function () {alert(1)});
a();
