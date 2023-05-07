const express = require('express');
const router = express.Router();
const Record = require('../../models/record');

// 首頁
router.get('/', async (req, res) => {
  try {
    const userId = req.user._id;
    const userName = res.locals.user.name || res.locals.user.email.split('@', 1);
    let totalAmount = 0;

    // 取出 records
    const records = await Record.find({ userId })
      .populate('categoryId')
      .lean()
      .sort({ _id: 'asc' });

    // 使用者不存在
    if (records.length === 0) {
      const noRecords = true;
      return res.render('index', { noRecords, totalAmount });
    }

    // 列出資料金額相加
    const formattedRecords = records.map((record) => {
      totalAmount += record.amount;
      record.date = record.date.toLocaleDateString('zu-Za');
      return record;
    });

    res.render('index', { records: formattedRecords, totalAmount, userName });
  } catch (err) {
    console.log(err);
  }
});

router.post('/filter', async (req, res) => {
  try {
    const userId = req.user._id;
    const { categoryId } = req.body

    // 如果選中的是 "全部"，則不進行篩選，直接返回所有紀錄
    if (categoryId === 'all') {
      res.redirect('/');
    } else {
      // 否則，根據選中的類別 ID 篩選紀錄
      const records = await Record.find({ userId })
        .populate('categoryId')
        .lean()
        const filteredRecords = records.filter((record) => record.categoryId.categoryName === categoryId)
        .map((record) => {
          // 使用toLocaleDateString()方法将日期格式化为 "YYYY-MM-DD" 格式(台灣)
          record.date = record.date.toLocaleDateString('zu-Za');
          return record;
        });

        // 計算類別總金額
        const totalAmount = filteredRecords.reduce((total, record) => total + record.amount, 0);
        res.render('index', { records:filteredRecords, totalAmount });
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;