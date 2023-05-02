const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')

const PORT = process.env.PORT || 3000
const mongoose = require('mongoose')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const Record = require = require('./models/record')

const app = express()
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

//設定static file
app.use(express.static('public'))

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

// 用 app.use 規定每一筆請求都需要透過 body-parser 進行前置處理
app.use(bodyParser.urlencoded({ extended: true }))

//設定路由
app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})

//測試首頁
app.get('/', (req, res) => {
  Record
  .find()
  .lean()
  .sort({ _id: "asc" })
  .then(records => res.render('index', {records}))
  .catch(err => console.log(err))
})

app.get ('/records/new', (req, res) => {
  return res.render('new')
})

app.post('/records', (req, res) => {
  const record= req.body
Record
  .create({record})
  .then(() => res.redirect('/'))
  .catch(err => {console.log(err)})
})