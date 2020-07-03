const {Friend} = require('../models')

class FriendService {
  constructor(Model) {
    this.Model = Model
  }

  getAllList(id) {
    return this.Model.findOne({user: id}).select('-_id -user')
  }

  async getWhiteList(id) {
    const friends = await this.getAllList(id)
    return {whiteList: friends.whiteList}
  }

  async getBlackList(id) {
    const friends = await this.getAllList(id)
    return {blackList: friends.blackList}
  }

  async getInComingList(id) {
    const friends = await this.getAllList(id)
    return {inComingList: friends.inComingList}
  }

  async getOutComingList(id) {
    const friends = await this.getAllList(id)
    return {outComingList: friends.outComingList}
  }
}

const friendService = new FriendService(Friend)

module.exports = friendService