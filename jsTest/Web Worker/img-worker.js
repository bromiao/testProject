// 1.预取数据
// 2.预渲染 （如canvas绘图）
// 3.复杂数据处理场景 （某些检索、排序、过滤、分析会非常耗费时间）
// 4.预加载图片
// 5.加解密

// worker线程
let arr = ['http://xx.com/xx/xx.jpg', '...'];
for (let i = 0, len = arr.length; i < len; i++) {
  let req = new XMLHttpRequest();
  req.open('GET', arr[i], true);
  req.responseType = "blob";
  req.setRequestHeader("client_type", "DESKTOP_WEB");
  req.onreadystatechange = () => {
    if (req.readyState === 4) {
      postMessage(req.response);
    }
  }
  req.send(null);
}
