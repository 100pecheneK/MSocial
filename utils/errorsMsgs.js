module.exports = (...errors) => ({errors: [...errors.map(error => ({msg: error}))]})
