/**
 * 虚拟代理实现图片预加载
 * @type {{setSrc: myImage.setSrc}}
 */
const myImage = (function () {
  const imgNode = document.createElement('img');
  document.body.appendChild(imgNode);

  return {
    setSrc: function (src) {
      imgNode.src = src;
    }
  }
})()

const proxyImage = function () {
  const img = new Image();
  img.onload = function () {
    myImage.setSrc(this.src);
  }

  return {
    setSrc: function (src) {
      myImage.setSrc('');
      img.src = src;
    }
  }
}

proxyImage.setSrc( 'http://imgcache.qq.com/music/photo/k/000GGDys0yA0Nk.jpg' );



/**************** 计算乘积 *****************/
var mult = function(){
  var a = 1;
  for ( var i = 0, l = arguments.length; i < l; i++ ){
    a = a * arguments[i];
  }
  return a;
};
/**************** 计算加和 *****************/
var plus = function(){
  var a = 0;
  for ( var i = 0, l = arguments.length; i < l; i++ ){
    a = a + arguments[i];
  }
  return a;
};
/**************** 创建缓存代理的工厂 *****************/
/**
 * 缓存代理
 * @param fn
 * @returns {function(): (*)}
 */
var createProxyFactory = function( fn ){
  var cache = {};
  return function(){
    var args = Array.prototype.join.call( arguments, ',' );
    if ( args in cache ){
      return cache[ args ];
    }
    return cache[ args ] = fn.apply( this, arguments );
  }
};
var proxyMult = createProxyFactory( mult ),
  proxyPlus = createProxyFactory( plus );
alert ( proxyMult( 1, 2, 3, 4 ) ); // 输出：24
alert ( proxyMult( 1, 2, 3, 4 ) ); // 输出：24
alert ( proxyPlus( 1, 2, 3, 4 ) ); // 输出：10
alert ( proxyPlus( 1, 2, 3, 4 ) ); // 输出：10
