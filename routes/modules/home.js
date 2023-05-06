const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')
const record = require('../../models/record')

//首頁
router.get('/', async(req, res) => {
  try{
    const userId = req.user._id
    const userName = res.locals.user.name || res.locals.user.email.split('@', 1)

    //設定totalAmount
    
    let totalAmount = 0 // 定義 totalAmount 為 0
    //取出records
    const records = await Record.find({userId}).populate('categoryId').lean().sort({ _id: "asc" })
    //使用者不存在
    if (records.length === 0) {
        const noRecords = true
        return res.render('index', { noRecords })
      }
      //列出資料金額相加
      const formattedRecords = records.map((record) => {
          totalAmount += record.amount;
          record.date = record.date.toLocaleDateString('zu-Za')
          // const iconClass = record.categoryId.icon.replace(/\D+\//g, "fa-").split(/\?\D+/g,)[0]
          // const iconShape = record.categoryId.icon.replace(/\D+=/g, "fa-")
          // icon = iconClass + " " + iconShape 
          return record;
        });
        res.render("index", { records: formattedRecords, totalAmount, userName })
  } catch (err) {
    console.log(err)
  }
})


// 顯示資料排序
 // 瀏覽特定的支出紀錄
router.get('/search', async (req, res) => {
    const userId = req.user._id
    const sortBy = req.query.sortBy
    conso
    try {
        const categoryId = await Category.find({ name: sortBy }).lean()
        const records = await Record.find({ categoryId, userId }).populate({ path: 'categoryId', select: 'icon' }).lean()
        formatDate(records)// 轉換日期格式
        res.render('index', { records, totalAmount: totalAmount(records) })
    } catch (err) {
        console.log(err)
    }
})
      //   const userId = req.user._id
      //   let categoryId = req.query.categoryId
      //   let totalAmount = 0 // 定義 totalAmount 為 0
      //   // 如果選中的是 "全部"，則不進行篩選，直接返回所有紀錄
      //   if (categoryId === "all") {
      //   const records = await Record.find({ userId }).populate('categoryId').lean().sort({ _id: "asc" });
      //   return res.render("index", { records });
      // } else {
      //   // 否則，根據選中的類別 ID 篩選紀錄
      //   const categoryName = await Category.find({categoryId}).lean()
      //   const records = await Record.find({ categoryId, userId }).populate({ path: 'categoryId', select: 'icon' }).lean()
      //   // 使用toLocaleDateString()方法将日期格式化为 "YYYY-MM-DD" 格式(台灣)
      //   const formattedDate = dbDate.toLocaleDateString("zh-TW", { year: 'numeric', month: '2-digit', day: '2-digit' });
      //   res.render('index', { records, totalAmount: totalAmount(records) })
      //   }
        
module.exports = router