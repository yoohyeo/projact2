import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Join() {
  const [join, setJoin] = React.useState({
    id: "",
    pw: "",
    name: "",
    phoneNumber: "",
  });
  const navigation = useNavigate();
  const 확인 = async () => {
    console.log(join);
    await axios({
      url: "http://localhost:4000/join",
      params: join,
    }).then(({ data }) => {
      alert(data.message);
      if (data.code === "success") {
        navigation("/");
      }
    });
  };

  return (
    <div className="main-div">
      <div className="main-login">
        <h3>
          <label>아이디</label>
        </h3>
        <input
          className="input-text"
          type="text"
          onChange={(event) => {
            const cloneJoin = { ...join };
            cloneJoin.id = event.target.value;
            setJoin(cloneJoin);
          }}
        />

        <h3>
          <label>비밀번호</label>
        </h3>
        <input
          className="input-text"
          type="password"
          onChange={(event) => {
            const cloneJoin = { ...join };
            cloneJoin.pw = event.target.value;
            setJoin(cloneJoin);
          }}
        />

        <h3>
          <label>비밀번호 재확인</label>
        </h3>
        <input className="input-text" type="password" />
        {/* <span className="ckecked-pw">비밀번호를 다시확인해주세요.</span> */}
        <h3>
          <label>이름</label>
        </h3>

        <input
          className="input-text"
          type="text"
          onChange={(event) => {
            const cloneJoin = { ...join };
            cloneJoin.name = event.target.value;
            setJoin(cloneJoin);
          }}
        />
        <h3>
          <label>전화번호</label>
        </h3>

        <input
          className="input-text"
          type="text"
          onChange={(event) => {
            const cloneJoin = { ...join };
            cloneJoin.phoneNumber = event.target.value;
            setJoin(cloneJoin);
          }}
        />
        <button className="btn-a" onClick={확인}>
          회원가입
        </button>
      </div>
    </div>
  );
}
export default Join;
