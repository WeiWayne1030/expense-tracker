const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
//加上路由
const routes = require('./routes')

const PORT = process.env.PORT || 3000
const mongoose = require('mongoose')
// 載入 method-override(method功能)
const methodOverride = require('method-override') 

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const Record = require = require('./models/record')

const app = express()
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

//設定static file
app.use(express.static('public'))
// 設定每一筆請求都會透過 methodOverride 進行前置處理
app.use(methodOverride('_method'))

// 取得資料庫連線狀態
const db = mongoose.connection
// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})

//hbs設定
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

// 用 app.use 規定每一筆請求都需要透過 body-parser 進行前置處理(順利取得req.body)
app.use(bodyParser.urlencoded({ extended: true }))
//引用路由
app.use(routes)


//設定路由
app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})