const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')
const record = require('../../models/record')
const category = require('../../models/category')


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
// router.post('/filter', async (req, res) => {
//     try {
//         const userId = req.user._id
//         let catelist = req.body
//         // 如果選中的是 "全部"，則不進行篩選，直接返回所有紀錄
//         if (catelist.categoryId === "全部") {
//             res.redirect('/')
//         } else {
//         // 否則，根據選中的類別 ID 篩選紀錄
//         const records = await Record.find({ userId,categoryId: catelist.categoryId // 只選取指定符合的類別
//         }).populate({ userId}).lean();

//         // 使用toLocaleDateString()方法将日期格式化为 "YYYY-MM-DD" 格式(台灣)
//         records.forEach(record => {
//           record.date = record.date.toLocaleDateString('zu-Za');
//         });

//         // 計算類別總金額
//         const totalAmount = records.reduce((total, record) => total + record.amount, 0);

//         res.render('index', { records, totalAmount, referenceCategory });
//         } 
//     } catch (err) {
//       console.log(err)
//     }
// })


router.post('/filter', async (req, res) => {
    try {
        const userId = req.user._id
        const categoryId = req.query.categoryId
        // 如果選中的是 "全部"，則不進行篩選，直接返回所有紀錄
        if (categoryId === "全部") {
            res.redirect('/')
        } else {
            // 否則，根據選中的類別 ID 篩選紀錄
            const records = await Record.find({ userId, categoryId: { $eq: categoryId } })
                                        .populate({ path: 'categoryId' })
                                        .lean();

            // 使用toLocaleDateString()方法将日期格式化为 "YYYY-MM-DD" 格式(台灣)
            records.forEach(record => {
                record.date = record.date.toLocaleDateString('zu-Za');
            });

            // 計算類別總金額
            const totalAmount = records.reduce((total, record) => total + record.amount, 0);

            res.render('index', { records, totalAmount });
        } 
    } catch (err) {
        console.log(err)
    }
});
module.exports = router