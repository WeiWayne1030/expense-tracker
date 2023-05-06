const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category= require('../../models/category')

//新增支出
router.get ('/new', async (req, res) => {
  return res.render('new')
})

router.post('/', async (req, res) => {
  const userId = req.user._id
  const record= req.body
  console.log(record)
  //先把 category資料取出來
  const categories = await Category.find({}).lean()
  const referenceCategory = categories.find(category => category.name === record.categoryId)
  //給record categoryd
  record.categoryId = referenceCategory._id

  //在Record創建新的資料
  await Record.create({ ...record, userId })
  res.redirect('/')
})

//修改支出
router.get('/:id/edit', async (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  try{
    const record = await Record.findOne({ _id, userId }).populate('categoryId').lean()
    //修改日期
    record.date = record.date.toLocaleDateString('zu-Za')
    res.render('edit', { record })
  //如果沒有資料
  if (!record) {
    req.flash('warning_msg', '出現預期外的問題，請您再嘗試一次。')
    return  res.redirect('/records')
  }
  }catch(err){
    console.log(err)
  }
})

router.put('/:id', async (req, res) =>{
  const _id = req.params.id
  const userId = req.user._id
  const editData = req.body
  try {
    // 把categoryId取出來
    const categories = await Category.find({}).lean()
    const currentCategory =  categories.find(category => category.categoryName === editData.category)
    editData.categoryId = currentCategory._id
    
    // 上傳資料
    let record = await Record.findOne({_id, userId})
    record = Object.assign(record, editData)

    // 存入資料庫 後回去 /records
    record.save()
    res.redirect('/')
  } catch (error) {
    console.log(error)
    req.flash('warning_msg', '刪除資料出現問題，請再嘗試一次。')
    res.redirect(`/records/${_id}/edit`)
  }
})

//刪除特定餐廳
router.delete('/:id', async (req, res) => {
  try{
    const userId = req.user._id
    const _id = req.params.id
    const record = await Record.findOne({ _id, userId })
    record.deleteOne() //async模式下不能使用remove 
    res.redirect('/')
  } catch(err) {
      console.log(err)
  }
})

module.exports = router