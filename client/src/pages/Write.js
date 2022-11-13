import React from "react";
import { useAsyncError, useNavigate } from "react-router-dom";
import { StoreContext } from "../App";
import axios from "axios";

function Write() {
  const { loginUser, setLoginUser } = React.useContext(StoreContext);
  const [write, setWrite] = React.useState({
    title: "",
    content: "",
    userId: loginUser.id,
    user: loginUser.name,
  });
  // console.log(write.userId, write.user);

  const navigation = useNavigate();
  React.useEffect(() => {
    // console.log(loginUser);
  }, [loginUser]);
  const 게시글올리기 = async () => {
    if (write.title === "" || write.content === "") {
      alert("입력해주세요!!");
      return;
    }
    await axios({
      url: "http://localhost:4000/write",
      params: {
        write: write,
      },
    }).then(navigation("/main"));
  };
  return (
    <div>
      <div className="user-div">
        안녕하세요 {loginUser.name}님 !
        <button
          onClick={() => {
            localStorage.removeItem("loginUser");
            setLoginUser({
              id: "",
              pw: "",
            });
            navigation("/");
          }}
        >
          로그아웃
        </button>
        <section className="main-section">
          <div className="write-div">
            <h3>
              <label>제목</label>
            </h3>
            <input
              className="input-title"
              type="text"
              onChange={(event) => {
                const cloneWrite = { ...write };
                cloneWrite.title = event.target.value;
                setWrite(cloneWrite);
                // console.log(event.target.value);
              }}
            />
          </div>
          <br></br>
          <br></br>
          <div className="write-div">
            <h3>
              <label>내용</label>
            </h3>
            <textarea
              className="input-content"
              type="text"
              onChange={(event) => {
                const cloneWrite = { ...write };
                cloneWrite.content = event.target.value;
                setWrite(cloneWrite);
                // console.log(event.target.value);
              }}
            />
          </div>
          <div className="write-div">
            <button className="btn-b" onClick={게시글올리기}>
              게시글 올리기
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
export default Write;
