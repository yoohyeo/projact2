import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { StoreContext } from "../App";

axios.defaults.withCredentials = true;

function Login() {
  const [user, setUser] = React.useState({
    id: "",
    pw: "",
  });
  const { loginUser, setLoginUser } = React.useContext(StoreContext);
  // console.log(loginUser);

  const 로그인 = async () => {
    await axios({
      url: "http://localhost:4000/login",
      params: {
        user: user,
      },
    }).then(({ data }) => {
      console.log(data);

      setLoginUser(data.user);
      // localStorage.setItem("loginUser", JSON.stringify(data.user));
      if (data.code === "success") {
        navigation("/main");
      } else {
        alert(data.message);
        navigation("/");
      }
    });
  };
  const navigation = useNavigate();
  return (
    <div className="main-div">
      <div className="main-login">
        <div>
          ID
          <input
            className="input-text"
            type="text"
            onChange={(event) => {
              const cloneuser = { ...user };
              cloneuser.id = event.target.value;
              setUser(cloneuser);
            }}
            placeholder="당신의 ID를 입력해주세요."
          />
        </div>
        <div>
          PW
          <input
            className="input-text"
            type="password"
            onChange={(event) => {
              const cloneuser = { ...user };
              cloneuser.pw = event.target.value;
              setUser(cloneuser);
            }}
            placeholder="당신의 PW를 입력해주세요."
          />
        </div>
        <button className="btn" onClick={로그인}>
          login
        </button>
        <button
          className="btn-a"
          onClick={() => {
            navigation("/join");
          }}
        >
          회원가입
        </button>
        <button
          className="btn-a"
          onClick={() => {
            navigation("/find");
          }}
        >
          ID,PW 찾기
        </button>
      </div>
    </div>
  );
}

export default Login;
