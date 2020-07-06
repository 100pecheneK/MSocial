const List = require('./List')

class BlackList extends List {
  get(id) {
    return this.getAll(id).select('blackList')
  }

  async add(whom, toWhom) {
    const target = await this.get(toWhom)
    return this._addToList(target, 'blackList', whom)
  }

  async rem(whom, toWhom) {
    const target = await this.get(toWhom)
    return this._remFromList(target, 'blackList', whom)
  }
}

module.exports = BlackList