import React from "react";
import { Route, Routes } from "react-router-dom";

import VideoChat from "../page/VideoChat";
import QnAList from "../page/QnAList";
import ReformList from "../page/ReformList";
import Header from "./Header";
// import Main from "../pages/Main";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import SignupTech from "./SignupTech";
import SignupUser from "./SignupUser";
// import Review from "../pages/Review";
import MyPage from "../page/MyPage";
import UserDetail from "../page/UserDetail";
import QnADetail from "../page/QnADetail";

export default function Router() {
  return (
    <>
      <Header />
      <Routes>
        {/* <Route path="/" element={<Main />} /> */}
        <Route path="/videochat" element={<VideoChat />} />
        <Route path="/qnalist" element={<QnAList />} />
        <Route path="/reformlist" element={<ReformList />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />}>
          <Route path="user" element={<SignupUser />} />
          <Route path="tech" element={<SignupTech />} />
        </Route>
        {/* <Route path="review" element={<Review />} /> */}
        <Route path="mypage" element={<MyPage />} />
        <Route path="userdetail/:userId" element={<UserDetail />} />
        <Route path="qnadetail/:postId" element={<QnADetail />} />
      </Routes>
    </>
  );
}
