import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

function FindIdPw() {
  const [find, setFind] = React.useState({
    name: "",
    phoneNumber: "",
  });
  const navigation = useNavigate();
  const 확인 = async () => {
    await axios({
      url: "http://localhost:4000/find",
      params: {
        find: find,
      },
    }).then(({ data }) => {
      console.log(data);
      alert(data.answer);
      if (
        data.id === "" ||
        data.pw === "" ||
        data.answer === "유효한 정보를 찾지 못했습니다."
      ) {
        navigation("/find");
      } else {
        navigation("/");
      }
    });
  };

  return (
    <div className="main-div">
      <div className="main-login">
        <h3>
          <label>이름</label>
        </h3>
        <input
          className="input-text"
          type="text"
          onChange={(event) => {
            const cloneFind = { ...find };
            cloneFind.name = event.target.value;
            setFind(cloneFind);
          }}
        />

        <h3>
          <label>전화번호</label>
        </h3>
        <input
          className="input-text"
          type="text"
          onChange={(event) => {
            const cloneFind = { ...find };
            cloneFind.phoneNumber = event.target.value;
            setFind(cloneFind);
          }}
        />
        <button className="btn-a" onClick={확인}>
          결과
        </button>
      </div>
    </div>
  );
}
export default FindIdPw;
