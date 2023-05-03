const db = require('../../../config/mongoose')
const Record = require('../../record')
const Category=require('../../category')
const expenseRecord = require("../json/expense.json")
const categoryList = require("../json/category.json")

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', async() => {
  console.log('running recordSeeder...')
  await Record.create(expenseRecord)
  console.log("recordSeeder done!")
  await Category.create(categoryList)
  console.log("categorySeeder done")
  db.close()
})
