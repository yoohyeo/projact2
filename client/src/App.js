import axios from "axios";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./App.css";
import AppIndex from "./AppIndex";

axios.defaults.withCredentials = true;

export const StoreContext = React.createContext({});
function App() {
  const [loginUser, setLoginUser] = React.useState({
    id: "",
    pw: "",
  });
  const navigation = useNavigate();
  // const [loding, setLoding] = React.useState(true);
  const 자동로그인 = async () => {
    await axios({
      url: "http://localhost:4000/autoLogin",
      //나중에 localhost대신 서버의 ip를 넣어서 마무리한다.
    }).then(({ data }) => {
      if (!data) {
        // alert("자동로그인실패");
        return;
      }

      setLoginUser(data);
      navigation("/main");
    });
  };

  React.useEffect(() => {
    자동로그인();
  }, []);

  return (
    <StoreContext.Provider
      value={{
        loginUser: loginUser,
        setLoginUser: setLoginUser,
      }}
    >
      <AppIndex />
    </StoreContext.Provider>
  );
}

export default App;
