// ライブラリ読み込み
const env = () => {
  if (process.env.NODE_ENV === 'production') {
    return 'prod';
  }
  return 'dev';
};

const ENV_FILE = `${__dirname}/../.${env()}.env`;
require('dotenv').config({ path: ENV_FILE });

const express = require('express');
const { Client } = require('pg');

const app = express();
const bodyParser = require('body-parser');

// body-parserの設定
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 8080; // port番号を指定

console.log({
  database: process.env.DATABASE_DB,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
});

const client = new Client({
  database: process.env.DATABASE_DB,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
});

try {
  client.connect();
} catch (e) {
  console.log('cannot connect db');
  console.log(e);
}

// GET http://localhost:3000/api/v1/
app.get('/v1/', (req, res) => {
  res.json({
    message: 'hello, gae app',
  });
});

app.get('/db/', async (req, res) => {
  try {
    const response = await client.query('SELECT * FROM "any"."user"');
    console.log('sql query response', response);
    res.json({
      message: 'SELECT * FROM "any"."user"',
      datas: response.rows,
    });
  } catch (err) {
    console.error(err);
    res.json({
      message: 'Error',
    });
  }
});

// サーバ起動
console.log(`listen on port ${port}`);
app.listen(port);
