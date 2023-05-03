const express = require('express')
const router = express.Router()
const Record = require('../../models/record')

//首頁
router.get('/', (req, res) => {
  Record
  .find()
  .lean()
  .sort({ _id: "asc" })
  .then(records => res.render('index', {records}))
  .catch(err => console.log(err))
})

module.exports = router