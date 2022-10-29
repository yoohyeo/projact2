const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
const mysql = require("mysql2");
const DB = mysql.createPoolCluster();

DB.add("project", {
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "project",
  port: 3306,
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

app.get("/login", async (req, res) => {
  const data = await 디비실행({
    database: "project",
    query: "SELECT * FROM user",
  });

  console.log(data);
  const { user } = req.query;
  const id = user.id;
  const pw = user.pw;
  const result = {
    code: "success",
    message: "로그인되었습니다",
    user: null,
  };

  const 유효성배열 = [1];
  for (let key in 유효성배열) {
    if (id === "") {
      result.code = "fail";
      result.message = "아이디를 입력해주세요";
      break;
    }
    if (pw === "") {
      result.code = "fail";
      result.message = "비밀번호를 입력해주세요";
      break;
    }
    const findUser = data.find((item) => {
      // console.log(item.id);
      return item.id === id && item.pw === pw;
    });
    if (findUser === undefined) {
      result.code = "fail";
      result.message = "정보를 확인해주세요";
      break;
    }
    result.user = findUser;

    res.send(result);
  }
  if (result.code === "fail") {
    res.send(result);
  }
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
