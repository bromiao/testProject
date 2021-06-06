const getSingle = function (fn) {
  let result;

  return function () {
    return result || (result = fn.apply(this, arguments));
  }
}

const createLoginLayer = function () {
  let div = document.createElement('div');
  div.innerHTML = '我是登录浮窗';
  div.style.cssText = 'position:fixed;left:50%;top:50%;transform:translate(-50%,-50%);' +
    'width:200px;height:70px;vertical-align: middle;background-color: #fff;border-radius: 4px;' +
    'border: 1px solid #ebeef5;font-size: 18px;text-align: left;overflow: hidden;' +
    'backface-visibility: hidden;display:none;box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);';
  div.id = 'showLoginIframe';
  document.body.appendChild(div);
  return div;
}

const createSingleLoginLayer = getSingle(createLoginLayer);

document.body.onclick = function () {
  let loginLayer = createSingleLoginLayer();
  loginLayer.style.display = 'block';
}

const createSingleIframe = getSingle(function () {
  let iframe = document.createElement('iframe');
  document.body.appendChild(iframe);
  return iframe;
})

document.getElementById('showLoginIframe').onclick = function () {
  let loginIframe = createSingleIframe();
  loginIframe.src = 'https://baidu.com';
}

