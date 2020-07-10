const List = require('./List')

class InComingList extends List {
  get(id) {
    return this.getAll(id).select('inComingList')
  }

  async add(whom, toWhom) {
    const target = await this.get(toWhom)
    return this._addToList(target, 'inComingList', whom)
  }

  async rem(whom, toWhom) {
    const target = await this.get(toWhom)
    return this._remFromList(target, 'inComingList', whom)
  }
}

module.exports = InComingList