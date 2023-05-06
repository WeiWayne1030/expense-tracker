const db = require('../../../config/mongoose')
const Category=require('../../category')
const categoryList = require("../json/category.json")

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

db.once('open', async() => {
  console.log('running categorySeedar..')  
  try {
    await Category.create(categoryList)
    console.log('categorySeeder is done')
    process.exit()
  } catch(err){
      console.log(err)
    } 
})