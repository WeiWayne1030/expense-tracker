const bcrypt = require('bcryptjs')
const db = require('../../../config/mongoose')
const expenseRecord = require("../json/expense.json")
const USER_SEED = require('../json/user.json')
const Record = require('../../record')
const User = require('../../user')
const Category=require('../../category')


if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
// 設定使用者的 Record index
USER_SEED[0].userRecord = [0, 2, 4] // 小明
USER_SEED[1].userRecord = [1, 3] // 小美

db.once('open', async() => {
  console.log('running Seeder.js...')
  
   // 取得類別資料
  const categoryData = await Category.find({})
  console.log('categoryData found.')
  return Promise.all(
    //把使用者全部取出來
    USER_SEED.map(async (user) => {
      try{
        //先產生一個使用者的bcrypt
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(user.password, salt)
        const createUser = await User.create({
          name: user.name,
          email: user.email,
          password: hash
        })
        console.log(`user ${createUser.name} created!`)

         // 找出 user 全部的 records
        const userRecords = user.userRecord.map(index => {
          const record = expenseRecord[index]
          // record 的 userId
          record.userId = createUser._id

          // record 的 categoryId
          const seed_Category = categoryData.find(data => {
            return data.categoryName === record.categoryId
          })
          record.categoryId = seed_Category._id
          // 回傳 record
          return record
        })

        // 製作 user Records
        await Record.create(userRecords)
        console.log(`${user.name}'s ${user.userRecord.length} records created!`)
      } catch (err) {
        console.log(err)
      }
    })
  )
    .then(() => {
      console.log('all users and records created!')
      process.exit()
    })
    .catch(err => {
      console.log(err)
    })    
})