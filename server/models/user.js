var mongoose = require('mongoose')
var bcrypt = require('bcryptjs')
var Schema = mongoose.Schema
var schemaName = 'User'
const SALT = 12


var schema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  displayName: {
    type: String,
    required: true,
  },
  hash: {
    type: String,
    required: true
  }
//   role: {
//     type: String,
//     enum: ROLES,
//     default: ''
//   }
})

schema.statics.generateHash = function (password) {
  return bcrypt.hashSync(password, SALT)
}

schema.methods.validatePassword = function (password) {
  return bcrypt.compare(password, this.hash)
}





module.exports = mongoose.model(schemaName, schema)