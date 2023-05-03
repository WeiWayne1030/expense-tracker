const express = require('express')
const router = express.Router()
const User = require('../../models/user')
const passport = require('passport')
const bcrypt = require('bcryptjs')

//登入
router.get('/login', (req, res) =>{
  req.flash('warning_msg', '請先登入才能使用！')
  res.render('login')
})

router.post('/login', (req, res, next) => {
  const { email, password } = req.body
  const errors = []
  if (!email || !password) {
    errors.push({message: '請輸入Email和Password'})
    return res.render('login', {errors})
  }
  next()
},
passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login',
}))

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  //輸入參數
  const {name, email, password, confirmPassword } = req.body
  const errors = []
  //檢查是否註冊
  if (!name|| !email || !password || !confirmPassword) {
    errors.push({ message: '所有欄位都是必填'})
  }
  if (password !== confirmPassword) {
    errors.push({ message: '密碼與確認密碼不相符！' })
  }
  if (errors.length) {
    return res.render('register', {
      errors,
      name,
      email,
      password,
      confirmPassword
    })
  }
  User.findOne({ email }).then(user => {
    //重新導向登入頁
    if(user) {
      errors.push({ message: '這個 Email 已經註冊過了。' })
      return res.render('register', {
        errors,
        name,
        email,
        password,
        confirmPassword
      })
    } 
    return bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(password, salt))
        .then(hash => User.create({
          name,
          email,
          password: hash
        }))
        .then(() => res.redirect('/'))
        .catch(err => console.log(err))
  })
})
router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', '你已成功登出')
  res.redirect('/users/login')
})


module.exports = router