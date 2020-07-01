/**
 * {
 *    "errors": [
 *        {
 *            "msg": "Нет авторизации"
 *        }
 *    ]
 *}
 * Generate error obj with array of errors
 * @param  {{msg: []} errors
 * @returns {{errors: {msg: string}[][]}}
 */
const errorsMsgs = (...errors) => {
  // map errors msgs to array with {msg:'error msg'}
  errors = [...errors.map((error) => ({msg: error}))]

  return {errors}
}
module.exports = errorsMsgs
