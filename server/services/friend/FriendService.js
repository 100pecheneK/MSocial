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
   * Delete request from incoming adn outcoming lists
   * @param who
   * @param whom
   * @return {Promise<string>}
   * @private
   */
  async _deleteRequest(who, whom) {
    await this._inComingList.rem(whom, who)
    await this._outComingList.rem(who, whom)
    return 'Запрос удалён'
  }

  /**
   * Добавить в друзья кого-то кому-то
   * @param whom
   * @param toWhom
   * @return {Promise<string>} Сообщение успеха
   * @private
   */
  async _makeFriends(whom, toWhom) {
    await this._outComingList.rem(toWhom, whom)
    await this._outComingList.rem(whom, toWhom)
    await this._inComingList.rem(whom, toWhom)
    await this._inComingList.rem(toWhom, whom)
    await this._whiteList.add(whom, toWhom)
    await this._whiteList.add(toWhom, whom)
    return 'Друг добавлен'
  }

  /**
   * Раздрузить. Удалить друг друга из друзей
   * @param who
   * @param whom
   * @return {Promise<string>} Сообщение успеха
   * @private
   */
  async _unmakeFriend(who, whom) {
    await this._whiteList.rem(who, whom)
    await this._whiteList.rem(whom, who)
    return 'Друг удалён'
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
      throw new this._Error('Вы не можете добавить себя в друзья')
    }
    // Отправитель в чёрном списке
    this._throwErrorIfContains(whom, target.blackList, 'Вы в чёрном списке')
    // Отправитель уже в друзьях
    this._throwErrorIfContains(whom, target.whiteList, 'Вы уже в друзьях')
    // Отправитель уже отправил заявку
    this._throwErrorIfContains(whom, target.inComingList, 'Вы уже отправили заявку')
    // Отправитель отправил заявку, но получатель отправлял ранее, поэтому добавил в друзья
    if (this._isContains(whom, target.outComingList)) {
      return await this._makeFriends(whom, toWhom)
    }
    // Удалить получателя из черного списка
    await this._blackList.rem(toWhom, whom)
    // Отправитель не отправлял заявку и получатель тоже,
    // поэтому добавить в исходящий и входящий список
    await this._outComingList.add(toWhom, whom)
    await this._inComingList.add(whom, toWhom)
    return 'Запрос отправлен'
  }


  /**
   * Remove "whom" request from "fromWhom"
   * @param whom
   * @param fromWhom
   * @return {Promise<string>} Сообщение успеха
   */
  async removeRequest(whom, fromWhom) {
    const target = await this._list.getAll(fromWhom)
    // Ошибка если пользователя не существует
    this._throwErrorIfNotExists(target)
    // Ошбка если заявка не отправлялась
    this._throwErrorIfNotContains(whom, target.inComingList, 'Вы не отправляли запрос')
    // Удаление заявки из входящего и исходящего листа
    await this._deleteRequest(whom, fromWhom)
    return 'Запрос отменён'
  }

  /**
   * "Who" accepting request from "whom"
   * @param who
   * @param whom
   * @return {Promise<string>} Сообщение успеха
   */
  async acceptRequest(who, whom) {
    const whoObject = await this._list.getAll(who)
    // Ошибка если заявки нет
    this._throwErrorIfNotContains(whom, whoObject.inComingList, 'Заявка не найдена')
    // Ошибка если пользователь уже в друзьях
    this._throwErrorIfContains(whom, whoObject.whiteList, 'Вы уже приняли заявку')
    // Удалить из черного списка (если есть)
    if (this._isContains(whom, whoObject.blackList)) {
      this._blackList.rem(whom, who)
    }
    // Сделать друзьями
    return await this._makeFriends(who, whom)
  }


  /**
   * "Who" rejecting request from "whom"
   * @param who
   * @param whom
   * @return {Promise<string>} Сообщение успеха
   */
  async rejectRequest(who, whom) {
    const whoObject = await this._list.getAll(who)
    // Ошибка если заявки нет
    this._throwErrorIfNotContains(whom, whoObject.inComingList, 'Заявка не найдена')
    // Удалить запрос из входящего и исходящего листа
    await this._deleteRequest(who, whom)
    return 'Запос отклонён'
  }

  /**
   * "Who" add "user" to Black List
   * @param who
   * @param whom
   * @return {Promise<string>} Сообщение успеха
   */
  async blockUser(who, whom) {
    const whoObject = await this._list.getAll(who)
    // Ошибка если в чёрном списке
    this._throwErrorIfContains(whom, whoObject.blackList, 'Пользователь уже в чёрном списке')
    // Удалить из друзей если есть
    if (this._isContains(who, whoObject.whiteList)) {
      await this._unmakeFriend(who, whom)
    }
    // Удалить заявку если есть
    if (this._isContains(whom, whoObject.inComingList)) {
      await this._deleteRequest(who, whom)
    }
    // Добавить в чёрынй список
    await this._blackList.add(whom, who)
    return 'Пользователь заблокирован'
  }

  /**
   * Remove friendship
   * @param who
   * @param whom
   * @return {Promise<string>}
   */
  async removeFriend(who, whom) {
    const whomWhiteList = await this._whiteList.get(whom)
    // Ошибка если не друзья
    this._throwErrorIfNotContains(who, whomWhiteList.whiteList, 'Вы не друзья')
    // Удалить друга
    return await this._unmakeFriend(who, whom)
  }
}

module.exports = FriendService