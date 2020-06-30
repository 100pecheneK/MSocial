/**
 * Generate error obj with array of errors
 * @param  {...string} errors
 * @returns {errors: [{msg:'error msg'}]}
 */
const errorsMsgs = (...errors) => {
  // map errors msgs to array with {msg:'error msg'}
  errors = [...errors.map((error) => ({ msg: error }))]

  return { errors }
}
module.exports = errorsMsgs
