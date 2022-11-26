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
    saveUninitialize: false,
  })
);

const DB = mysql.createPoolCluster();

DB.add("project", {
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "project",
  port: 3306,
});
// aws에서 서버 host의 주소로 나중에 바꿔준다.

async function 디비실행(params) {
  const { query, database } = params;
  const data = await new Promise((resolve) => {
    DB.getConnection(database, function (err, connection) {
      if (err) {
        console.log("연결 에러 !! ===>", err);
        return;
      }

      connection.query(query, function (err, data) {
        if (err) {
          console.log("쿼리 에러 !! ===>", err);
          return;
        }

        resolve(data);
      });

      connection.release();
    });
  });
  return data;
}
function 인서트만들기({ table, data }) {
  const column = Object.keys(data);
  const values = Object.values(data);

  if (column.length !== values.length)
    return throwError("Error Object Key Value");

  const c = column.join(",");
  const v = values.join("','");

  return `INSERT INTO ${table}(${c}) VALUES ('${v}')`;
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
  const join = req.query;

  const id = join.id;
  const pw = join.pw;
  const name = join.name;
  const phoneNumber = join.phoneNumber;
  const result = {
    code: "success",
    message: "회원가입이 되었습니다",
  };
  data.forEach(async (item) => {
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
  /**
   * 지우지 말것 아주 중요(Mysql로 데이터 보내기)
   */
  await 디비실행({
    query: insert,
    database: "project",
  });

  res.send(result);
});
app.get("/find", async function (req, res) {
  const data = await 디비실행({
    database: "project",
    query: "SELECT * FROM user",
  });
  const { find } = req.query;
  const name = find.name;
  const phoneNumber = find.phoneNumber;
  const result = {
    id: "",
    pw: "",
    answer: "유효한 정보를 찾지 못했습니다.",
  };

  data.map((item) => {
    if (item.name === name && item.phonenumber === phoneNumber) {
      result.id = item.id;
      result.pw = item.pw;
      result.answer = `당신의 아이디 : ${result.id}, 비밀번호 ${result.pw}입니다`;
      return result;
    }
    return result;
  });

  res.send(result);
});
app.get("/main", async function (req, res) {
  const loginUser = req.session.loginUser;

  let sql = `SELECT * FROM diary WHERE userid = '${loginUser.id}' `;

  if (loginUser.seq === 1) {
    sql = "SELECT * FROM diary";
  }

  const data = await 디비실행({
    database: "project",
    query: sql,
  });
  res.send(data);
});

function 데이터수정({ table, data, where }) {
  let updateStr = "";
  let whereStr = "1";

  for (let column in data) {
    const value = data[column] ? data[column] : "";
    updateStr += `${column} = '${value}',`;
  }

  const updateStr1 = updateStr.substring(0, updateStr.length - 1);

  if (where.length > 0) {
    whereStr = where.join(" AND ");
  }
  return `UPDATE ${table} SET ${updateStr1} WHERE ${whereStr}`;
}

app.get("/get_write", async function (req, res) {
  const { seq } = req.query;
  let result = [];

  if (seq) {
    result = await 디비실행({
      database: "project",
      query: `SELECT * FROM DIARY WHERE seq = '${seq}'`,
    });
  }

  res.send(result);
});

app.get("/write", async function (req, res) {
  const data = await 디비실행({
    database: "project",
    query: "SELECT * FROM DIARY",
  });
  const { seq } = req.query;
  const { write } = req.query;
  const title = write.title;
  const content = write.content;
  const userId = write.userId;
  const user = write.user;
  if (seq) {
    const userId = write.userid;
    const update = 데이터수정({
      table: "DIARY",
      data: {
        title: title,
        content: content,
        userid: userId,
        user: user,
      },
      where: [`seq = ${seq}`],
    });

    /**
     *  지우지 말것(mysql 게시글 수정)
     */
    await 디비실행({
      query: update,
      database: "project",
    });
  } else {
    const insert = 인서트만들기({
      table: "DIARY",
      data: {
        title: title,
        content: content,
        user: user,
        userid: userId,
      },
    });
    /**
     *  지우지 말것(mysql 게시글 생성)
     */
    await 디비실행({
      query: insert,
      database: "project",
    });
  }

  res.send("asdasdsd");
});

function 데이터삭제({ table, where }) {
  const where2 = where.join(" AND ");

  return `DELETE FROM ${table} WHERE ${where2}`;
}

app.get("/delete", async function (req, res) {
  const data = await 디비실행({
    database: "project",
    query: "SELECT * FROM DIARY",
  });
  const seq = req.query.seq;
  const delete1 = 데이터삭제({
    table: "DIARY",
    where: [`seq = ${seq}`],
  });
  /**
   *  지우지 말것(mysql 게시글 생성)
   */
  // await 디비실행({
  //   query: delete1,
  //   database: "project",
  // });
});
app.get("/look", async function (req, res) {
  const data = await 디비실행({
    database: "project",
    query: "SELECT * FROM DIARY",
  });
  const { seq } = req.query;
  const result = {
    seq: "",
    title: "",
    content: "",
    user: "",
    userId: "",
    answer: "정보가 없습니다.다시한번 확인해주세요",
  };
  data.map((item) => {
    if (seq == item.seq) {
      result.title = item.title;
      result.content = item.content;
      result.user = item.user;
      result.userId = item.userid;
      result.seq = item.seq;
      result.answer = "확인되었습니다.";
      return result;
    }
    return result;
  });
  // console.log(result);
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
