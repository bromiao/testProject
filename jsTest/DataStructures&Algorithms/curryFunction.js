function foo(...args) {
  var target = (...args1) => foo(...[...args, ...args1]);
  target.getValue = () => args.reduce((p,c) => p + c, 0);
  return target;
}
console.log(foo(1)(2,3)(4)(5,6).getValue());
