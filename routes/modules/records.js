const express = require('express')
const router = express.Router()
const Record = require('../../models/record')

//新增餐廳
router.get ('/new', (req, res) => {
  return res.render('new')
})

router.post('/', (req, res) => {
  const record= req.body
Record
  .create(record)
  .then(() => res.redirect('/'))
  .catch(err => {console.log(err)})
})

//修改支出
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .lean()
    .then((record) => res.render('edit', { record }))
    .catch(err => {
      console.log(err)
    })
})
router.put('/:id', (req, res) =>{
  const id = req.params.id
  return Record.findById(id)
    .then(record => {
      record = Object.assign(record, req.body)
      return record.save()
    })
    .then(()=> res.redirect('/'))
    .catch(err => {
      console.log(err)
    })
})

//刪除特定餐廳
router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .then(record => { record.remove() })
    .then(() => res.redirect('/'))
    .catch(err => {
      console.log(err)
    })
})

module.exports = router