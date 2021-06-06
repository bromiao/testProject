// 获取不同上传对象的方法被隔离在各自的函数里互不干扰，
// try、catch 和 if 分支不再纠缠在一起，使得我们可以很方便地的维护和扩展代码。

const getActiveUploadObj = function () {
  try {
    return new ActiveXObject( "TXFTNActiveX.FTNUpload" ); // IE 上传控件
  } catch (e) {
    return false;
  }
}

const getWebkitUploadObj = function () {
  // 。。。
}

const getFlashUploadObj = function () {
  if ( supportFlash() ){ // supportFlash 函数未提供
    var str = '<object type="application/x-shockwave-flash"></object>';
    return $( str ).appendTo( $('body') );
  }
  return false;
}

const getH5UploadObj = function () {
  // ...
}

const getFormUploadObj = function () {
  var str = '<input name="file" type="file" class="ui-file"/>'; // 表单上传
  return $( str ).appendTo( $('body') );
}

const iteratorUploadObj = function () {
  for (let i = 0, fn; fn = arguments[i++]; ) {
    const uploadObj = fn();

    if (uploadObj !== false) {
      return uploadObj;
    }
  }
}

iteratorUploadObj(getActiveUploadObj, getWebkitUploadObj, getFlashUploadObj, getH5UploadObj, getFormUploadObj);

/*单一职责原则，appendDiv中的遍历逻辑单独剥离出来*/
var each = function( obj, callback ) {
  var value,
    i = 0,
    length = obj.length,
    isArray = isArraylike( obj ); // isArraylike 函数未实现，可以翻阅 jQuery 源代码
  if ( isArray ) { // 迭代类数组
    for ( ; i < length; i++ ) {
      callback.call( obj[ i ], i, obj[ i ] );
    }
  } else {
    for ( i in obj ) { // 迭代 object 对象
      value = callback.call( obj[ i ], i, obj[ i ] );
    }
  }
  return obj;
};
var appendDiv = function( data ){
  each( data, function( i, n ){
    var div = document.createElement( 'div' );
    div.innerHTML = n;
    document.body.appendChild( div );
  });
};
appendDiv( [ 1, 2, 3, 4, 5, 6 ] );
appendDiv({a:1,b:2,c:3,d:4} );
