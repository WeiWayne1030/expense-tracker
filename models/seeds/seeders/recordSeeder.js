const bcrypt = require('bcryptjs')
const db = require('../../../config/mongoose')
//const Category=require('../../category')
const expenseRecord = require("../json/expense.json")
//const categoryList = require("../json/category.json")
const User = require('../user')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const SEED_USER = [
  {
    name: "user1",
    email: "user1@example.com",
    password: "12345678",
  },
  {
    name: "user2",
    email: "user2@example.com",
    password: "12345678",
  },
]

db.once('open', () => {
  console.log('running Seeder.js...')
  bcrypt
    .genSalt(10)
    .then(salt =>
      bcrypt.hash(SEED_USER[0].password, salt))
    .then(hash =>
      User.create({
        name: SEED_USER[0].name,
        email: SEED_USER[0].email,
        password: hash
      })
    )
    .then(user => {
      const userId = user._id
      for (let i = 0; i < 2; i++) {
        Restaurant.create({ ...expenseRecord[i], userId })
      }
    })
    .then(console.log('user1 seed done'))

  bcrypt
    .genSalt(10)
    .then(salt => bcrypt.hash(SEED_USER[1].password, salt))
    .then(hash => User.create({
      name: SEED_USER[1].name,
      email: SEED_USER[1].email,
      password: hash
    }))
    .then(user => {
      const userId = user._id
      for (let i = 2; i < 3; i++) {
        Restaurant.create({ ...expenseRecord[i], userId })
      }
    })
    .then(() => {
      console.log('user2 seed done')
    })
    .catch(err => console.log(err))
})