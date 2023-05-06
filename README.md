# expense-tracker

# A3 : 媽媽的記帳本 (AC 3 A3)

## Screenshot - 畫面截圖

## About - 介紹

這是一個用 Express 製作的私帳清單。
使者可以登入自己的帳戶紀錄自己的私帳。

## Environment - 開發環境

- node v14.16.0
- MongoDB4.0 以上

## Features - 功能

1. 使用者可以登入，登出，註冊
2. 使用者可以 CRUD 自己的帳目
3. 使用者可以依照帳目類型來瀏覽帳目
4. 使用者可以 sort 賬目的排序

## Installation and execution - 安裝與執行步驟

1.開啟 Terminal, Clone 此專案至本機:

```
git clone https://github.com/WeiWayne1030/expense-tracker.git
```

2.進入存放此專案的資料夾

```
cd expanse-tracker
```

3.安裝 npm 套件

```
npm install
```

4.安裝 nodemon (如果已有可跳過)

```
npm install -g nodemon
```

5.使用 MongoDB cloud 獲得你的 connection string

```
mongodb+srv://<username>:<password>@<cluster>.pk4dwnp.mongodb.net/?retryWrites=true&w=majority
```

6.在專案內創造一個.env 檔案，並在其輸入你的 MongoDB connection string

```
MONGODB_URL=mongodb+srv://<username>:<password>@<cluster>.pk4dwnp.mongodb.net/<database name>?retryWrites=true&w=majority
```

7.製作種子資料

```
npm run seed
```

8.製作 .env 檔案，可以參考 .env.example

```
PORT=
MONGODB_URI=
SESSION_SECRET=
FACEBOOK_APP_CALLBACK=
FACEBOOK_APP_ID=
FACEBOOK_APP_SECRET=
```

9.啟動伺服器 (這會使用 nodemon 啟動專案)

```
npm run dev
```

## 種子資料

種子資料除了生出帳目(Records)以外，也會產生 2 個使用者資料
使用者是依照 user.json 資料來設定

```
{
  "results": [
    {
      "name": "小明",
      "email": "123@example.com",
      "password": "123"
    },
    {
      "name": "小美",
      "email": "321@example.com",
      "password": "321"
    }
  ]
}
```

## Contributor - 專案開發人員

> [Wayne Sun]([https://github.com/WeiWayne1030])
