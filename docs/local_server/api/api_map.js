// yewu11/v1
const getAccessConfig = require('./json_data/yewu11/v1/getAccessConfig.json')
const imgDomain = require('./json_data/yewu11/v1/imgDomain.json')
const hotUlikeRecommendation = require('./json_data/yewu11/v1/hotUlikeRecommendation.json')
const init = require('./json_data/yewu11/v1/init.json')
const matchHomePageHandpick = require('./json_data/yewu11/v1/matchHomePageHandpick.json')
const videoReferUrl = require('./json_data/yewu11/v1/videoReferUrl.json')
const videoAnimationUrl = require('./json_data/yewu11/v1/videoAnimationUrl.json')
const getMatchBaseInfoByMids = require('./json_data/yewu11/v1/getMatchBaseInfoByMids.json')
const matches = require('./json_data/yewu11/v1/matches.json')
const getRankingByTournamentId = require('./json_data/yewu11/v1/getRankingByTournamentId.json')
const getVideos = require('./json_data/yewu11/v1/getVideos.json')

// yewu11/v2
const headList = require('./json_data/yewu11/v2/headList.json')
const hotList = require('./json_data/yewu11/v2/hotList.json')
const getMenuVideos = require('./json_data/yewu11/v2/getMenuVideos.json')
const getDateMenuList = require('./json_data/yewu11/v2/getDateMenuList.json')


// yewu12
const getUserInfo = require('./json_data/yewu12/getUserInfo.json')
const amount = require('./json_data/yewu12/amount.json')
const getBannersUrl = require('./json_data/yewu12/getBannersUrl.json')
const setUserLanguage = require('./json_data/yewu12/setUserLanguage.json')

module.exports = {
  getAccessConfig,
  imgDomain,
  hotUlikeRecommendation,
  headList,
  init,
  getUserInfo,
  amount,
  getBannersUrl,
  setUserLanguage,
  hotList,
  matchHomePageHandpick,
  videoReferUrl,
  videoAnimationUrl,
  getMatchBaseInfoByMids,
  matches,
  getRankingByTournamentId,
  getMenuVideos,
  getVideos,
  getDateMenuList,
}