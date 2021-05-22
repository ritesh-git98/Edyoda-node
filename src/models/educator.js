const mongoose = require('mongoose')
const Schema = mongoose.Schema
let validator = require('validator')
const EducatorSchema = new Schema({
    _id: {
            type: String,
            lowercase: true,
            validate: (value) => {
              return validator.isEmail(value)
            }
  },
  userName: String,
  fullName: String,
  contact: String,
  password:String,
  video: Array
})
module.exports = mongoose.model('Educator', EducatorSchema)


// required: true,
// unique: true