const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
const mysql = require("mysql2");
const DB = mysql.createPoolCluster();

const 데이터가저오기 = async () => {
  const data = await new Promise((resolve) => {
    DB.getConnection("user", (error, connection) => {
      if (error) {
        console.log("데이터베이스 연결 오류 ===>", error);
        return;
      }
      connection.query("SELECT * FROM user", (error, data) => {
        if (error) {
          console.log("쿼리 오류 ===>", error);
          return;
        }

        resolve(data);
      });
    });
  });
};
DB.add("project", {
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "project",
  port: 3306,
});

app.get("/login", async (req, res) => {
  // console.log(data);
  res.send(데이터가저오기);
});

app.get("/", function (req, res) {
  res.send("Hello node.js");
});
app.get("/hello", function (req, res) {
  res.send("안녕하세요");
});

app.listen(5000, function () {
  console.log("Start Node Server!");
});
