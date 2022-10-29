import React from "react";

import { Routes, Route } from "react-router-dom";

import { Join, Login, FindIdPw, Main } from "./pages";

function AppIndex() {
  return (
    <Routes>
      <Route exact path="/" element={<Login />} />
      <Route exact path="/join" element={<Join />} />
      <Route exact path="/find" element={<FindIdPw />} />
      <Route exact path="/main" element={<Main />} />
    </Routes>
  );
}

export default AppIndex;
