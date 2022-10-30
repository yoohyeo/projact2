const express = require("express");
const cors = require("cors");
const app = express();
const session = require("express-session");
const mysql = require("mysql2");

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(
  session({
    secret: "sadwqdwqwdqw",
    resave: false,
    saveUninitialize: true,
  })
);

// app.use((req, res, next) => {
//   next();
// });

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

app.get("/autoLogin", (req, res) => {
  res.send(req.session.loginUser);
});

app.get("/login", async (req, res) => {
  const data = await 디비실행({
    database: "project",
    query: "SELECT * FROM user",
  });

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
      // console.log(item);
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

  req.session.loginUser = result.user;
  req.session.save();

  if (result.code === "fail") {
    res.send(result);
  }
});
app.get("/join", async (req, res) => {
  const data = await 디비실행({
    database: "project",
    query: "SELECT * FROM user",
  });
  // console.log(req.query);
  const join = req.query;
  const id = join.id;
  const pw = join.pw;
  const name = join.name;
  const phoneNumber = join.phoneNumber;
  // console.log(phoneNumber);
  const result = {
    code: "success",
    message: "회원가입이 되었습니다",
  };
  // console.log(data);
  data.forEach(async (item) => {
    // console.log(item);
    if (item.id === id) {
      result.code = "fail";
      result.message = "중복아이디 입니다.";
    }
    if (item.phonenumber === phoneNumber) {
      result.code = "fail";
      result.message = "기존회원입니다.";
    }
  });

  if (result.code === "fail") {
    res.send(result);
    return;
  }

  const insert = 인서트만들기({
    table: "user",
    data: {
      id: id,
      pw: pw,
      name: name,
      phonenumber: phoneNumber,
    },
  });
  // await 디비실행({
  //   query: insert,
  //   database: "project",
  // });

  res.send(result);
});

app.get("/", function (req, res) {
  res.send("Hello node.js");
});
app.get("/hello", function (req, res) {
  res.send("안녕하세요");
});

app.listen(4000, function () {
  console.log("Start Node Server!");
});

function 인서트만들기({ table, data }) {
  const column = Object.keys(data);
  const values = Object.values(data);

  if (column.length !== values.length)
    return throwError("Error Object Key Value");

  const c = column.join(",");
  const v = values.join("','");

  return `INSERT INTO ${table}(${c}) VALUES ('${v}')`;
}
