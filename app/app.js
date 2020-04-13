// ライブラリ読み込み
const express = require('express');

const app = express();
const bodyParser = require('body-parser');

// body-parserの設定
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 8080; // port番号を指定

// GET http://localhost:3000/api/v1/
app.get('/v1/', (req, res) => {
  res.json({
    message: 'Hello, GAE APP',
  });
});

// サーバ起動
console.log(`listen on port ${port}`);
app.listen(port);
