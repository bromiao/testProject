/* 引入express框架 */
const express = require('express');
const app = express();
/* 引入cors 一定要在路由之前，配置cors这个中间件，从而解决接口跨域问题 */
const cors = require('cors');
app.use(cors());
/* 引入body-parser */
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.all('*', function (req, res, next) {
  if (!req.get('Origin')) return next();
  // use "*" here to accept any origin
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET');
  res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
  // res.set('Access-Control-Allow-Max-Age', 3600);
  if ('OPTIONS' == req.method) return res.send(200);
  next();
});
app.get('/', (req, res) => {
  res.send('ok');
})
app.get('/api/list', (req, res) => {
  res.json({
    code: 200,
    message: '成功',
    data: {
      list: []
    }
  });
})

// 导入路由模块
const yewu11_v1 = require('./api/yewu11_v1')
const yewu11_v2 = require('./api/yewu11_v2')
const yewu12 = require('./api/yewu12')
// 把路由模块,注册到app上
app.use('/yewu11/v1', yewu11_v1)
app.use('/yewu11/v2', yewu11_v2)
app.use('/yewu12', yewu12)

/* 监听端口 */
app.listen(80, () => {
  console.log('listen:80');
})