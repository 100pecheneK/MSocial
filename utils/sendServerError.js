const logError = require('./logError')

module.exports = (res, error) => {
  const date = new Date()
  logError(date, error)
  return res.status(500).send(`Ошибка сервера. Обратитесь к поддержке и предоставьте эту дату: ${date.toISOString()}`)
}