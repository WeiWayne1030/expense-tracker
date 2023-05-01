
  const mongoose = require('mongoose')
const Schema = mongoose.Schema
const categorySchema = new Schema ({
  categoryId: {
    type: Number,
    required: true
  }
})

module.exports = mongoose.model('Category', categorySchema)
  
  
  