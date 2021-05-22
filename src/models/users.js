const mongoose = require('mongoose')
const Schema = mongoose.Schema
let validator = require('validator')
const UserSchema = new Schema({
    _id: {
            type: String,
            lowercase: true,
            validate: (value) => {
              return validator.isEmail(value)
            }
  },
  fullName: String,
  userName: String,
  phNum: String,
  password: String,
  videos_watched:Array,
  subscribed: Array
})

module.exports = mongoose.model('Users', UserSchema)


// required: true,
// unique: true