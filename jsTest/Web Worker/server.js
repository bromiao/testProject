const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // 指定允许其他域名访问
  res.header('Access-Control-Allow-Headers', 'Origin,X-Requested-With,content-Type,Accept,token,sysCode'); // 响应头设置
  res.header('Access-Control-Allow-Methods', 'POST,GET'); // 响应类型
  res.header('X-Powered-By', '3.2.1'); // 隐藏响应
  res.header('Content-Type', 'application/plain;charset=utf-8'); // 映射请求信息
  next();
})

let num = 1;
setInterval(() => {
  num++;
}, 1000);

app.all('/testWorker', (req, res) => {
  res.send({data:num});
})

const port = 3001
app.listen(port, () => {
  console.log('app is running at http://localhost:' + port);
})
