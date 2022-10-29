import React from "react";
import "./App.css";
import AppIndex from "./AppIndex";

export const StoreContext = React.createContext({});
function App() {
  const [joinUser, setJoinUser] = React.useState({
    id: "",
    pw: "",
  });
  return (
    <StoreContext.Provider>
      <AppIndex />
    </StoreContext.Provider>
  );
}

export default App;
