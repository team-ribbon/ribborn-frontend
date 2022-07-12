import React from "react";
import { Route, Routes } from "react-router-dom";

import VideoChat from "../page/VideoChat";
import QnAList from "../page/QnAList";
import ReformList from "../page/ReformList";
import Header from "./Header";
import Main from "../pages/Main";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import SignupTech from "./SignupTech";
import SignupUser from "./SignupUser";
import Review from "../pages/Review";
import MyPage from "../page/MyPage";
import UserDetail from "../page/UserDetail";
import QnADetail from "../page/QnADetail";
import ReviewDetail from "../page/ReviewDetail";
import Lookbook from "../pages/Lookbook";
import WritePost from "../pages/WritePost";
import styled from "styled-components";
import Footer from "./Footer";

export default function Router() {
  return (
    <>
      <Header />
      <MainWrap>
        <Routes>
          {/* <Route path="/" element={<VideoChat />} /> */}
          <Route path="/" element={<Main />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />}>
            <Route path="user" element={<SignupUser />} />
            <Route path="tech" element={<SignupTech />} />
          </Route>
          <Route path="review" element={<Review />} />
          <Route path="lookbook" element={<Lookbook />} />
          <Route path="/qna" element={<QnAList />} />
          <Route path="/reform" element={<ReformList />} />
          <Route path="write/:type" element={<WritePost />} />
          <Route path="edit/:type/:id" element={<WritePost />} />
          <Route path="mypage" element={<MyPage />} />
          <Route path="userdetail/:userId" element={<UserDetail />} />
          <Route path="qnadetail/:postId" element={<QnADetail />} />
          <Route path="reviewdetail/:postId" element={<ReviewDetail />} />
        </Routes>
      </MainWrap>
      <Footer />
    </>
  );
}
const MainWrap = styled.main`
  padding-top: 125px;
`;
