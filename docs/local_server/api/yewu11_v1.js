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

router.get('/getSystemTime/currentTimeMillis', (req, res) => {
  res.send({
    "code":"0000000",
    "data": '' + Date.now(),
    "msg":"成功",
    "ts":Date.now()
  })
})

const api_map = require('./api_map')

router.get('/art/getAccessConfig', (req, res) => {
  res.send(api_map['getAccessConfig'])
})
router.get('/games/imgDomain', (req, res) => {
  res.send(api_map['imgDomain'])
})
router.get('/m/hotUlikeRecommendation', (req, res) => {
  res.send(api_map['hotUlikeRecommendation'])
})
router.get('/m/menu/init', (req, res) => {
  res.send(api_map['init'])
})
router.get('/m/matchHomePageHandpick', (req, res) => {
  res.send(api_map['matchHomePageHandpick'])
})
router.post('/w/videoReferUrl', (req, res) => {
  res.send(api_map['videoReferUrl'])
})
router.post('/w/videoAnimationUrl', (req, res) => {
  res.send(api_map['videoAnimationUrl'])
})
router.post('/m/getMatchBaseInfoByMids', (req, res) => {
  const body = req.body
  console.log(1111, body)
  res.send(api_map['getMatchBaseInfoByMids'])
})
router.post('/m/matches', (req, res) => {
  const body = req.body
  res.send(api_map['matches'])
})
router.get('/tournamentRanking/getRankingByTournamentId', (req, res) => {
  res.send(api_map['getRankingByTournamentId'])
})
router.get('/w/getVideos', (req, res) => {
  res.send(api_map['getVideos'])
})

module.exports = router
