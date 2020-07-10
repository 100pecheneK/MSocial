const List = require('./List')

class OutComingList extends List {
  get(id) {
    return this.getAll(id).select('outComingList')
  }

  async add(whom, toWhom) {
    const target = await this.get(toWhom)
    return this._addToList(target, 'outComingList', whom)
  }

  async rem(whom, toWhom) {
    const target = await this.get(toWhom)
    return this._remFromList(target, 'outComingList', whom)
  }
}

module.exports = OutComingList