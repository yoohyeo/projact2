import React from "react";

import { Routes, Route } from "react-router-dom";

import { Join, Login, FindIdPw, Main, Write, Look } from "./pages";

function AppIndex() {
  return (
    <Routes>
      <Route exact path="/" element={<Login />} />
      <Route exact path="/join" element={<Join />} />
      <Route exact path="/find" element={<FindIdPw />} />
      <Route exact path="/main" element={<Main />} />
      <Route exact path="/write" element={<Write />} />
      <Route exact path="/look/:seq" element={<Look />} />
    </Routes>
  );
}

export default AppIndex;
