import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Join() {
  // const [join,setJoin] = React.useState({
  //   아이디:  ,
  //   비밀번호 : ,
  //   이름 : ,
  //   전화번호: ,
  // });
  const navigation = useNavigate();

  return (
    <div className="main-div">
      <div className="main-login">
        <h3>
          <label>아이디</label>
        </h3>
        <input className="input-text" type="text" />

        <h3>
          <label>비밀번호</label>
        </h3>
        <input className="input-text" type="password" />

        <h3>
          <label>비밀번호 재확인</label>
        </h3>
        <input className="input-text" type="password" />
        {/* <span className="ckecked-pw">비밀번호를 다시확인해주세요.</span> */}
        <h3>
          <label>이름</label>
        </h3>

        <input className="input-text" type="text" />
        <h3>
          <label>전화번호</label>
        </h3>

        <input className="input-text" type="text" />
        <button
          className="btn-a"
          onClick={() => {
            navigation("/");
          }}
        >
          회원가입
        </button>
      </div>
    </div>
  );
}
export default Join;
