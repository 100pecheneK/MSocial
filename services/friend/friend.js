const FriendService = require('./FriendService')
const FriendServiceError = require('./FriendServiceError')
const {
  List,
  InComingList,
  OutComingList,
  WhiteList,
  BlackList
} = require('./lists')

const friendService = new FriendService({
  list: new List(),
  inComingList: new InComingList(),
  outComingList: new OutComingList(),
  whiteList: new WhiteList(),
  blackList: new BlackList(),
  Error: FriendServiceError
})

module.exports = friendService