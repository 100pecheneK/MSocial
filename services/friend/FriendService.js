class FriendService {
  constructor({list, inComingList, outComingList, whiteList, blackList, Error}) {
    this.list = list
    this.inComingList = inComingList
    this.outComingList = outComingList
    this.whiteList = whiteList
    this.blackList = blackList
    this.Error = Error
  }

  _throwErrorIfNotExists(target) {
    if (!target)
      throw new FriendServiceError('Пользователя не существует')
  }

  _isContains(whom, where) {
    return !!where.find(id => whom === id.toString())
  }

  _throwErrorIfContains(whom, where, errorMessage) {
    if (this._isContains(whom, where))
      throw new this.Error(errorMessage)
  }

  _throwErrorIfNotContains(whom, where, errorMessage) {
    if (!this._isContains(whom, where))
      throw new this.Error(errorMessage)
  }

  getFriends(id) {
    return this.list.getAll(id)
  }

  /**
   * Добавить запрос кого-то кому-то
   * @param whom
   * @param toWhom
   * @return {Promise<string>} Сообщение об успехе или выкинет ошибку при валидации
   */
  async addRequest(whom, toWhom) {
    const target = await this.list.getAll(toWhom)
    // Получателя не существует
    this._throwErrorIfNotExists(target)
    // Отправитель сам себе отправил запрос
    if (whom === target.user.toString()) {
      throw new FriendServiceError('Вы не можете добавить себя в друзья')
    }
    // Отправитель в чёрном списке
    this._throwErrorIfContains(whom, target.blackList, 'Вы в чёрном списке')
    // Отправитель уже в друзьях
    this._throwErrorIfContains(whom, target.whiteList, 'Вы уже в друзьях')
    // Отправитель уже отправил заявку
    this._throwErrorIfContains(whom, target.inComingList, 'Вы уже отправили заявку')
    // Отправитель отправил заявку, но получатель отправлял ранее, поэтому добавил в друзья
    if (this._isContains(whom, target.outComingList)) {
      return await this.makeFriends(whom, toWhom)
    }
    // Отправитель не отправлял заявку и получатель тоже,
    // поэтому добавить в исходящий и входящий список
    await this.outComingList.add(toWhom, whom)
    await this.inComingList.add(whom, toWhom)
    return 'Запрос отправлен'
  }

  /**
   * Добавить в друзья кого-то кому-то
   * @param whom
   * @param toWhom
   * @return {Promise<string>} Сообщение успеха
   */
  async makeFriends(whom, toWhom) {
    await this.outComingList.rem(toWhom, whom)
    await this.outComingList.rem(whom, toWhom)
    await this.inComingList.rem(whom, toWhom)
    await this.inComingList.rem(toWhom, whom)
    await this.whiteList.add(whom, toWhom)
    await this.whiteList.add(toWhom, whom)
    return 'Друг добавлен'
  }

  async removeRequest(whom, fromWhom) {
    const target = await this.list.getAll(fromWhom)
    this._throwErrorIfNotExists(target)
    this._throwErrorIfNotContains(whom, target.inComingList, 'Вы не отправляли запрос')
    await this.inComingList.rem(whom, fromWhom)
    await this.outComingList.rem(fromWhom, whom)
    return 'Запрос отменён'
  }
}

module.exports = FriendService