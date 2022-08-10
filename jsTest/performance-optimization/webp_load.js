const html =
    `<picture className="pic">
      <source type="image/webp" srcSet="a.webp">
      <img className="img" src="a.jpg">
    </picture>`

function checkWebp(callback) {
  var img = new Image();
  img.onload = function () {
    var result = (img.width>0) && (img.height>0);
    callback(result);
  };
  img.onerror = function () {
    callback(false);
  };
  img.src = 'data:image/webp;base64,UklGRiIAAABXRUJQVIA4IBYPKNKwAQCdASoBAAEADsD+JaQAASFRDFGJ';
}
function showlmage(flag){
  var imgs = Array.from(document.querySelectorAll('img'))
  imgs.forEach(function(i){
    var src = i.attributes['data-src'].value
    if(flag){
      i.src = src
    }else{
      src = src.replace(/\.webp$/,'.jpg')
    }
  })
}
checkWebp(showlmage)


// 服务端响应不同格式
/**
 * 支持webp图片的浏览器在向服务器发送请求时，
 * 会在请求头Accept中带上image/webp，
 * 然后服务器根据是否含有这个头信息来决定返回webp或其它格式图片。
 * 很多云服务器和CDN带有这种WebP自适应功能。
 */