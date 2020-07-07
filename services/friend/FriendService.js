class FriendService {
  constructor({list, inComingList, outComingList, whiteList, blackList, Error}) {
    this._list = list
    this._inComingList = inComingList
    this._outComingList = outComingList
    this._whiteList = whiteList
    this._blackList = blackList
    this._Error = Error
  }

  /**
   * Getter for private Error Class
   * @return {Error} Error class
   * @constructor
   */
  get Error() {
    return this._Error
  }

  /**
   * Throwing Error if !target
   * @param target
   * @private
   */
  _throwErrorIfNotExists(target) {
    if (!target)
      throw new this._Error('Пользователя не существует')
  }

  /**
   * True if "whom" contains in "where"
   * @param whom
   * @param where
   * @return {boolean}
   * @private
   */
  _isContains(whom, where) {
    return !!where.find(id => whom === id.toString())
  }

  /**
   * Throwing Error if "whom" is contains in "where"
   * @param whom String
   * @param where Array
   * @param errorMessage
   * @private
   */
  _throwErrorIfContains(whom, where, errorMessage) {
    if (this._isContains(whom, where))
      throw new this._Error(errorMessage)
  }

  /**
   * Throwing Error if "whom" is not contains in "where"
   * @param whom String
   * @param where Array
   * @param errorMessage
   * @private
   */
  _throwErrorIfNotContains(whom, where, errorMessage) {
    if (!this._isContains(whom, where))
      throw new this._Error(errorMessage)
  }

  /**
   * Return all Friend object for user with "id"
   * @param id
   */
  getFriends(id) {
    return this._list.getAll(id)
  }

  /**
   * Return whileList Friend object for user with "id"
   * @param id
   */
  getWhiteList(id) {
    return this._whiteList.get(id)
  }

  /**
   * Return all blackList object for user with "id"
   * @param id
   */
  getBlackList(id) {
    return this._blackList.get(id)
  }

  /**
   * Return inComingList Friend object for user with "id"
   * @param id
   */
  getInComingList(id) {
    return this._inComingList.get(id)
  }

  /**
   * Return outComingList Friend object for user with "id"
   * @param id
   */
  getOutComingList(id) {
    return this._outComingList.get(id)
  }

  /**
   * Добавить запрос кого-то кому-то
   * @param whom
   * @param toWhom
   * @return {Promise<string>} Сообщение об успехе или выкинет ошибку при валидации
   */
  async addRequest(whom, toWhom) {
    const target = await this._list.getAll(toWhom)
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
    await this._outComingList.add(toWhom, whom)
    await this._inComingList.add(whom, toWhom)
    return 'Запрос отправлен'
  }

  /**
   * Добавить в друзья кого-то кому-то
   * @param whom
   * @param toWhom
   * @return {Promise<string>} Сообщение успеха
   */
  async makeFriends(whom, toWhom) {
    await this._outComingList.rem(toWhom, whom)
    await this._outComingList.rem(whom, toWhom)
    await this._inComingList.rem(whom, toWhom)
    await this._inComingList.rem(toWhom, whom)
    await this._whiteList.add(whom, toWhom)
    await this._whiteList.add(toWhom, whom)
    return 'Друг добавлен'
  }

  /**
   * Remove "whom" request from "fromWhom"
   * @param whom
   * @param fromWhom
   * @return {Promise<string>}
   */
  async removeRequest(whom, fromWhom) {
    const target = await this._list.getAll(fromWhom)
    this._throwErrorIfNotExists(target)
    this._throwErrorIfNotContains(whom, target.inComingList, 'Вы не отправляли запрос')
    await this._inComingList.rem(whom, fromWhom)
    await this._outComingList.rem(fromWhom, whom)
    return 'Запрос отменён'
  }
}

module.exports = FriendService