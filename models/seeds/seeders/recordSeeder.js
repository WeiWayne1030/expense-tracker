const mongoose = require('mongoose')
const Record = require('../../record')
const Category=require('../../category')
const expenseRecord = require("../json/expense.json")
const categoryList = require("../json/category.json")

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', async() => {
  console.log('running recordSeeder...')
  await Record.create(expenseRecord)
  await Category.create(categoryList)
  console.log("restaurantSeeder done!")
  db.close()
})
