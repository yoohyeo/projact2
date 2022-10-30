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
    }).then(({ data }) => {
      if (!data) {
        // alert("자동로그인실패");
        return;
      }

      setLoginUser(data);
      navigation("/main");
    });
  };
  // const { pathname } = useLocation();
  // const 주소유효성검증 = () => {
  //   const 로그인했을때비접근주소 = ["join", "", "find"];
  //   const 주소 = pathname.slice(1);
  //   console.log(주소);

  //   if (로그인했을때비접근주소.includes(주소) && loginUser.id !== "") {
  //     navigation("/main");
  //   }
  // };
  React.useEffect(() => {
    자동로그인();
  }, []);
  // React.useEffect(() => {
  //   주소유효성검증();
  // }, [loginUser]);

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
