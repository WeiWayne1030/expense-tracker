const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')

//首頁
router.get('/', async(req, res) => {
  try{
    const userId = req.user._id
    const userName = res.locals.user.name || res.locals.user.email.split('@', 1)

    //設定totalAmount
    
    let totalAmount = 0 // 定義 totalAmount 為 0
    //取出records
    const records = await Record.find({userId}).populate('categoryId').lean().sort({ _id: "asc" })
    if (records.length === 0) {
        const noRecords = true
        return res.render('index', { noRecords })
      }
      //列出資料金額相加
      records.forEach((record) => {
        //加入總金額
        totalAmount += record.amount
        record.date = record.date.toLocaleDateString('zu-Za')
        const iconClass = record.categoryId.icon.replace(/\D+\//g, "fa-").split(/\?\D+/g,)[0]
        const iconShape = record.categoryId.icon.replace(/\D+=/g, "fa-")
        record.categoryId.icon = iconClass + " " + iconShape 
        return record
      })

      res.render('index', { records, userName, totalAmount }) // 將 totalAmount 傳遞到模板中
  } catch (err) {
    console.log(err)
  }
})


//filter
router.get('/filter', async (req, res) => {
  try {
    const userId = req.user._id
    const selectId = req.query.categoryId
    let totalAmount = 0
    const categories = await Category.find().lean().sort({ _id: 'asc' })
    const records = await Record.find({ userId }).populate('categoryId').lean().sort({ date: 'desc' })
    records.forEach((record) => {
        //篩選總金額
        totalAmount += record.amount
        record.date = record.date.toLocaleDateString('zu-Za')
        const iconClass = record.categoryId.icon.replace(/\D+\//g, "fa-").split(/\?\D+/g,)[0]
        const iconShape = record.categoryId.icon.replace(/\D+=/g, "fa-")
        record.categoryId.icon = iconClass + " " + iconShape 
        return record
      })
    res.render('index', { categories, totalAmount, selectId,records })
  } catch (error) {
    console.log(error)
  }
})


module.exports = router