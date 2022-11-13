import React from "react";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../App";
import axios from "axios";

function Main() {
  const { loginUser, setLoginUser } = React.useContext(StoreContext);
  const [diary, setDiary] = React.useState([]);
  const navigation = useNavigate();
  const 게시판작성 = () => {
    navigation("/write");
  };
  const 게시판보러가기 = (event) => {
    // console.log(event.target);
    // navigation("/look");
  };

  const 게시판수정 = () => {};
  React.useEffect(() => {}, [loginUser]);
  const 게시판 = async () => {
    await axios({
      url: "http://localhost:4000/main",
    }).then(({ data }) => {
      setDiary(data);
    });
  };
  React.useEffect(() => {
    게시판();
  }, []);
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
        <div className="main-div">
          <table className="tg">
            <thead>
              <tr>
                <td className="tg-0pky">번호</td>
                <td className="tg-0pky">제목</td>
                <td className="tg-0pky">글쓴이</td>
              </tr>
            </thead>
            <tbody>
              {diary.length > 0 &&
                diary.map((item, index) => {
                  return (
                    <tr
                      key={`diary-${index}`}
                      onClick={게시판보러가기}
                      className="article-table"
                    >
                      <td>{index + 1}</td>
                      <td>{item.title}</td>
                      <td>{item.user}</td>
                      <button className="btn-c" onClick={게시판수정}>
                        수정
                      </button>
                      <button
                        className="btn-c"
                        onClick={(event) => {
                          const cloneDiary = [...diary].filter((value) => {
                            return value.seq !== item.seq;
                          });
                          setDiary(cloneDiary);
                        }}
                      >
                        삭제
                      </button>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
        <div className="write-div">
          <button className="btn-b" onClick={게시판작성}>
            글쓰기
          </button>
        </div>
      </div>
    </div>
  );
}
export default Main;
