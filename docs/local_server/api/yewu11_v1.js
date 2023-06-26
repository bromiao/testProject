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
router.post('/w/structureTournamentMatches', (req, res) => {
  res.send(api_map['structureTournamentMatches'])
})
router.post('/searchSettings/getHotPush', (req, res) => {
  res.send(api_map['getHotPush'])
})
router.get('/w/matchDetail/getMatchDetail', (req, res) => {
  res.send(api_map['getMatchDetail'])
})
router.get('/m/matchDetail/getMatchDetail', (req, res) => {
  res.send(api_map['getMatchDetail2'])
})
router.get('/w/category/getCategoryList', (req, res) => {
  const {sportId} = req.query
  if (['100', '101', '102', '103'].includes(sportId)) {
    return res.send(api_map['getCategoryList2'])
  }
  res.send(api_map['getCategoryList'])
})
router.get('/m/category/getCategoryList', (req, res) => {
  const {sportId} = req.query
  if (['100', '101', '102', '103'].includes(sportId)) {
    return res.send(api_map['getCategoryList2'])
  }
  res.send(api_map['getCategoryList'])
})
router.post('/w/playbackVideoUrl', (req, res) => {
  res.send(api_map['playbackVideoUrl'])
})
router.post('/w/structureMatchBaseInfoByMids', (req, res) => {
  res.send(api_map['structureMatchBaseInfoByMids'])
})
router.post('/w/getLatestVideo', (req, res) => {
  res.send(api_map['getLatestVideo'])
})
router.post('/w/matchDetail/getMatchOddsInfo2', (req, res) => {
  res.send(api_map['getMatchOddsInfo2'])
})
router.get('/w/matchDetail/addVisitHistory', (req, res) => {
  res.send(api_map['addVisitHistory'])
})
router.get('/w/matchDetail/getVisitHistory', (req, res) => {
  res.send(api_map['getVisitHistory'])
})
router.get('/w/matchDetail/getMatchOddsInfo1', (req, res) => {
  res.send(api_map['getMatchOddsInfo1'])
})
router.get('/m/matchDetail/getMatchOddsInfo1', (req, res) => {
  res.send(api_map['getMatchOddsInfo1'])
})
router.post('/w/liveVideoUrl', (req, res) => {
  res.send(api_map['liveVideoUrl'])
})
router.post('/w/isLogin', (req, res) => {
  res.send(api_map['isLogin'])
})
router.get('/w/getFilterMatchList', (req, res) => {
  res.send(api_map['getFilterMatchList'])
})
router.post('/w/structureLiveMatches', (req, res) => {
  res.send(api_map['structureLiveMatches'])
})
router.post('/w/menu/countCollectTotal', (req, res) => {
  res.send(api_map['countCollectTotal'])
})
router.post('/w/esports/getDateMenuList', (req, res) => {
  res.send(api_map['getDateMenuList2'])
})
router.post('/w/esportsTournamentMatches', (req, res) => {
  res.send(api_map['esportsTournamentMatches'])
})
router.get('/w/5esportsMatches', (req, res) => {
  res.send(api_map['_5esportsMatches'])
})
router.post('/m/esportsMatches', (req, res) => {
  res.send(api_map['esportsMatches'])
})
router.get('/w/hotEsportsMatches', (req, res) => {
  res.send(api_map['hotEsportsMatches'])
})
router.post('/w/esportsMatchInfoByMids', (req, res) => {
  res.send(api_map['esportsMatchInfoByMids'])
})
router.get('/w/matchDetail/getESMatchDetail', (req, res) => {
  res.send(api_map['getESMatchDetail'])
})
router.get('/m/matchDetail/getESMatchDetail', (req, res) => {
  res.send(api_map['getESMatchDetail'])
})
router.post('/w/virtualProMatches', (req, res) => {
  res.send(api_map['virtualProMatches'])
})
router.post('/w/virtualReplay', (req, res) => {
  res.send(api_map['virtualReplay'])
})
router.post('/w/virtual/getVirtualSportTeamRanking', (req, res) => {
  res.send(api_map['getVirtualSportTeamRanking'])
})
router.get('/w/virtual/getVideoMaxTime', (req, res) => {
  res.send(api_map['getVideoMaxTime'])
})
router.get('/w/matchDetail/getVirtualMatchResult', (req, res) => {
  res.send(api_map['getVirtualMatchResult'])
})
router.get('/w/virtual/menus', (req, res) => {
  res.send(api_map['menus'])
})
router.post('/w/virtual/getMatchScore', (req, res) => {
  res.send(api_map['getMatchScore'])
})
router.get('/w/matchDetail/getVirtualMatchDetail', (req, res) => {
  res.send(api_map['getVirtualMatchDetail'])
})
router.get('/w/matchDetail/getVirtualMatchOddsInfo', (req, res) => {
  res.send(api_map['getVirtualMatchOddsInfo'])
})
router.get('/w/matchDetail/getESMatchOddsInfo', (req, res) => {
  res.send(api_map['getESMatchOddsInfo'])
})
router.get('/m/matchDetail/getESMatchOddsInfo', (req, res) => {
  res.send(api_map['getESMatchOddsInfo'])
})

module.exports = router
