const order500 = function (orderType, pay, stock) {
  if (orderType === 1 && pay === true) {
    console.log( '500 元定金预购，得到 100 优惠券' );
  } else {
    return 'nextSuccessor';  // 我不知道下一个节点是谁，反正把请求往后面传递
  }
}

const  order200 = function (orderType, pay, stock) {
  if (orderType === 2 && pay === true) {
    console.log( '200 元定金预购，得到 50 优惠券' );
  }else{
    return 'nextSuccessor';  // 我不知道下一个节点是谁，反正把请求往后面传递
  }
};

const orderNormal = function (orderType, pay, stock) {
  if (stock > 0) {
    console.log( '普通购买，无优惠券' );
  }else{
    console.log( '手机库存不足' );
  }
}

/**
 * 接下来需要把函数包装进职责链节点，我们定义一个构造函数 Chain，在 new Chain 的时候传
 * 递的参数即为需要被包装的函数，同时它还拥有一个实例属性 this.successor，表示在链中的下
 * 一个节点。
 */
const Chain = function (fn) {
  this.fn = fn;
  this.successor = null;
}

Chain.prototype.setNextSuccessor = function (successor) {
  return this.successor = successor;
}

Chain.prototype.passRequest = function () {
  const ret = this.fn.apply(this, arguments);

  if (ret === 'nextSuccessor') {
    return this.successor && this.successor.passRequest.apply(this.successor, arguments);
  }

  return ret;
}


// 现在我们把 3 个订单函数分别包装成职责链的节点：
var chainOrder500 = new Chain( order500 );
var chainOrder200 = new Chain( order200 );
var chainOrderNormal = new Chain( orderNormal );
// 然后指定节点在职责链中的顺序：
chainOrder500.setNextSuccessor( chainOrder200 );
chainOrder200.setNextSuccessor( chainOrderNormal );
// 最后把请求传递给第一个节点：
chainOrder500.passRequest( 1, true, 500 ); // 输出：500 元定金预购，得到 100 优惠券
chainOrder500.passRequest( 2, true, 500 ); // 输出：200 元定金预购，得到 50 优惠券
chainOrder500.passRequest( 3, true, 500 ); // 输出：普通购买，无优惠券
chainOrder500.passRequest( 1, false, 0 ); // 输出：手机库存不足

// 在异步情况下，需要手动传递请求给职责链中的下一个节点
Chain.prototype.next= function(){
  return this.successor && this.successor.passRequest.apply( this.successor, arguments );
};
// 来看一个异步职责链的例子：
var fn1 = new Chain(function(){
  console.log( 1 );
  return 'nextSuccessor';
});
var fn2 = new Chain(function(){
  console.log( 2 );
  var self = this;
  setTimeout(function(){
    self.next();
  }, 1000 );
});
var fn3 = new Chain(function(){
  console.log( 3 );
});
fn1.setNextSuccessor( fn2 ).setNextSuccessor( fn3 );
fn1.passRequest();



/*************************用 AOP 实现职责链 , 替换多重if判断，减少代码量，降低对象间的耦合性***************************/
Function.prototype.after = function (fn) {
  const self = this;

  return function () {
    const ret = self.apply(this, arguments);

    if (ret === 'nextSuccessor') {
      return fn.apply(this, arguments);
    }

    return ret;
  }
}

const order = order500.after( order200 ).after( orderNormal );
order( 1, true, 500 ); // 输出：500 元定金预购，得到 100 优惠券
order( 2, true, 500 ); // 输出：200 元定金预购，得到 50 优惠券
order( 1, false, 500 ); // 输出：普通购买，无优惠券
