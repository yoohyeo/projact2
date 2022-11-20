import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { StoreContext } from "../App";
import axios from "axios";

function Look() {
  const { seq } = useParams();

  // alert(seq);
  const { loginUser, setLoginUser } = React.useContext(StoreContext);
  const navigation = useNavigate();
  const [diary, setDiary] = React.useState({
    seq: "",
    title: "",
    content: "",
    user: "",
    userId: "",
  });

  const 자세히보기 = async () => {
    await axios({
      url: "http://localhost:4000/look",
      params: {
        seq: seq,
      },
    }).then(({ data }) => {
      setDiary(data);
      console.log(diary);
    });
  };
  React.useEffect(() => {
    자세히보기();
  }, [loginUser]);
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
      </div>
      <section className="main-section">
        <div className="write-div">
          <h3>
            {diary.user}님의 {diary.title}
          </h3>
        </div>
        <div className="user-id">{diary.userId}</div>
        <br></br>
        <br></br>
        <div className="write-div">
          <h3>{diary.content}</h3>
        </div>
        <div className="write-div">
          <button className="btn-b">수정하기</button>
        </div>
      </section>
    </div>
  );
}
export default Look;
