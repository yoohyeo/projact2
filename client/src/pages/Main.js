import React from "react";
import { useNavigate } from "react-router-dom";

function Main() {
  const navigation = useNavigate();
  return (
    <div className="main-div">
      <div className="main-login">
        <div>
          ID
          <input
            className="input-text"
            type="text"
            placeholder="당신의 ID를 입력해주세요."
          />
        </div>
        <div>
          PW
          <input
            className="input-text"
            type="password"
            placeholder="당신의 PW를 입력해주세요."
          />
        </div>
        <button className="btn">login</button>
        <button
          className="btn-a"
          onClick={() => {
            navigation("/join");
          }}
        >
          회원가입
        </button>
        <button className="btn-a">ID,PW 찾기</button>
      </div>
    </div>
  );
}

export default Main;
