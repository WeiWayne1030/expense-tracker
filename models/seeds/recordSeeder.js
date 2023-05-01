const mongoose = require('mongoose')
const Record = require('../record')
const Category=require('../category')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('record connected')
  Record.create(
  { 
    name: 'lunch',
    date: Date(2023, 04, 28),
    amount: 210
  })
})

db.once('open', () => {
  console.log('Category connected!')
  Category.create(
  { categoryId: 1
  })
})