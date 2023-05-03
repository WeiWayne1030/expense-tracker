const express = require('express')
const router = express.Router()
const Record = require('../../models/record')

//新增支出
router.get ('/new', (req, res) => {
  return res.render('new')
})

router.post('/', (req, res) => {
  const userId = req.user._id
  const record= req.body
Record
  .create({ ...record, userId })
  .then(() => res.redirect('/'))
  .catch(err => {
    console.log(err)
    res.render(
      'errorPage', 
      { error: err.message }
      )
  })
})

//修改支出
router.get('/:id/edit', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  return Record.findOne({ _id, userId })
    .lean()
    .then((record) => res.render('edit', { record }))
    .catch(err => {
      console.log(err)
      res.render(
      'errorPage', 
      { error: err.message }
      )
    })
})
router.put('/:id', (req, res) =>{
  const _id = req.params.id
  const userId = req.user._id
  return Record.findOne({ _id, userId })
    .then(record => {
      record = Object.assign(record, req.body)
      return record.save()
    })
    .then(()=> res.redirect('/'))
    .catch(err => {
      console.log(err)
      res.render(
      'errorPage', 
      { error: err.message }
      )
    })
})

//刪除特定餐廳
router.delete('/:id', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  return Record.findOne({ _id, userId })
    .then(record => { record.remove() })
    .then(() => res.redirect('/'))
    .catch(err => {
      console.log(err)
      res.render(
      'errorPage', 
      { error: err.message }
      )
    })
})

module.exports = router