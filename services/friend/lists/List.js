const {Friend} = require('../../../models')

class List {
  constructor() {
    this.Model = Friend
  }

  async _addToList(target, listName, whom) {
    target[listName].push(whom)
    return await target.save()
  }

  async _remFromList(target, listName, whom) {
    target[listName] = target[listName].filter(id => whom !== id)
    return await target.save()
  }

  getAll(id) {
    return this.Model.findOne({user: id})
  }

  get() {
    throw new Error('Function "get()" must be implemented')
  }

  add() {
    throw new Error('Function "add()" must be implemented')
  }

  rem() {
    throw new Error('Function "rem()" must be implemented')
  }
}

module.exports = List