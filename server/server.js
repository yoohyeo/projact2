const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

// MYSQL 연결 ===========================

app.use(
  cors({
    origin: true,
  })
);
const mysql = require("mysql2");
const DB = mysql.createPoolCluster();

const 데이터가저오기 = async () => {
  const data = await new Promise((resolve) => {
    DB.getConnection("nike_shop", (error, connection) => {
      if (error) {
        console.log("데이터베이스 연결 오류 ===>", error);
        return;
      }
      connection.query("SELECT * FROM product", (error, data) => {
        if (error) {
          console.log("쿼리 오류 ===>", error);
          return;
        }

        resolve(data);
      });
    });
  });
};
// 127.0.0.1  === localhost
DB.add("nike_shop", {
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "nike_shop",
  port: 3306,
});

// MYSQL 연결 ===========================

// MYSQL 가져오기 =======================

app.get("/product", async (req, res) => {
  // 비동기 = Promise 객체

  console.log(data);

  //

  res.send(data);
});

const port = 4000;

app.get("/", (req, res) => {
  res.send("hello");
});

app.get("/myCart", (req, res) => {
  // DB에있는 장바구니 send해주기!
  res.send("??");
});

/**
 * 쿼리스트링
 * req : 요청
 * res : 응답
 */

app.listen(port, () => {
  console.log("Start Node.js Server");
});

app.get("/products", async (req, res) => {
  const data = await 디비실행({
    database: "nike_shop",
    query: "SELECT * FROM product",
  });

  console.log(data);

  res.send("");
});
async function 디비실행(params) {
  const { query, database } = params;
  const data = await new Promise((resolve) => {
    DB.getConnection(database, function (err, connection) {
      if (err) {
        console.log("연결 에러 !! ===>", err);
      }

      connection.query(query, function (err, data) {
        if (err) {
          console.log("쿼리 에러 !! ===>", err);
        }

        resolve(data);
      });
    });
  });
  return data;
}
