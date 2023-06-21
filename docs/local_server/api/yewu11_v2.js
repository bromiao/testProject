const express = require('express')
const router = express.Router()

// 挂载对应的路由
router.get('/get',(req,res) => {
  // 通过req.query获取客户端通过查询字符串，发送到服务器的数据
  const query = req.query
  // 调用res.send()方法，向客户端响应处理的结果
  res.send({
    status:0,    // 0表示处理成功，1表示处理失败
    msg:'GET 请求成功',    //状态的描述
    data:query // 需要响应给客户端的数据 
  })
})

// 定义post接口
router.post('/post',(req,res) => {
  //通过req.body获取请求体中包含的url-encoded格式的数据
  const body = req.body
  //调用res.send()向客户端响应结果
  res.send({
    status:0,
    msg:'post 请求成功',
    data:body
  })
})


const api_map = require('./api_map')

router.post('/notice/headList', (req, res) => {
  res.send(api_map['headList'])
})
router.get('/w/menu/hotList', (req, res) => {
  res.send(api_map['hotList'])
})
router.get('/m/menu/getMenuVideos', (req, res) => {
  res.send(api_map['getMenuVideos'])
})
router.post('/menu/getDateMenuList', (req, res) => {
  res.send(api_map['getDateMenuList'])
})

module.exports = router
