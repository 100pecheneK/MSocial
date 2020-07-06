const List = require('./List')

class WhiteList extends List {
  get(id) {
    return this.getAll(id).select('whiteList')
  }

  async add(whom, toWhom) {
    const target = await this.get(toWhom)
    return this._addToList(target, 'whiteList', whom)
  }

  async rem(whom, toWhom) {
    const target = await this.get(toWhom)
    return this._remFromList(target, 'whiteList', whom)
  }
}

module.exports = WhiteList