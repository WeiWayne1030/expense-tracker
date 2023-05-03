const express = require('express')
const router = express.Router()
const Record = require('../../models/record')

//首頁
router.get('/', (req, res) => {
  const userId = req.user._id
  const userName = res.locals.user.name || res.locals.user.email.split('@', 1)
  Record
  .find({ userId })
  .lean()
  .sort({ _id: "asc" })
  .then(records => res.render('index', { records, userName }))
  .catch(err => console.log(err))
})

module.exports = router