const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')
const bodyParser = require('body-parser')
//加上路由
const routes = require('./routes')
// 載入設定檔，要寫在 express-session 以後
const usePassport = require('./config/passport')
require('./config/mongoose')


const PORT = process.env.PORT

// 載入 method-override(method功能)
const methodOverride = require('method-override')
//一次性使用者提示
const flash = require('connect-flash') 

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const app = express()


//設定static file
app.use(express.static('public'))
// 設定每一筆請求都會透過 methodOverride 進行前置處理
app.use(methodOverride('_method'))

//hbs設定
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

//加入驗證資訊（session)
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))

// 用 app.use 規定每一筆請求都需要透過 body-parser 進行前置處理(順利取得req.body)
app.use(bodyParser.urlencoded({ extended: true }))
// 呼叫 Passport 函式並傳入 app，這條要寫在路由之前
usePassport(app)

app.use(flash())  // (掛載套件)

//切換導覽列
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})
//引用路由
app.use(routes)




//設定路由
app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})