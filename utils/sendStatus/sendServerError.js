const logError = require('../logError')

/**
 * Sending Server Error 500 to frontend
 * @param {responce obj} res
 * @param {string} error
 */
const sendServerError = (res, error) => {
  const date = new Date()
  logError(date, error)

  return res
    .status(500)
    .send(
      `Ошибка сервера. Обратитесь к поддержке и предоставьте эту дату: ${date.toISOString()}`
    )
}

module.exports = sendServerError
