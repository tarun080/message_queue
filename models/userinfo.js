const mongoose = require('mongoose')

const Details = mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
    email: { 
      type: String, 
      unique: true, 
      required: true 
    }
})

module.exports = mongoose.model("Details", Details)