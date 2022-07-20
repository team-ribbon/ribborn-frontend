import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import styled from "styled-components";

import Header from "./Header";
import Footer from "./Footer";

import Main from "../pages/postPages/Main";
import Login from "../pages/userPages/Login";
import Signup from "../pages/userPages/Signup";
import SignupTech from "./SignupTech";
import SignupUser from "./SignupUser";
import MyPage from "../pages/userPages/MyPage";
import UserDetail from "../pages/userPages/UserDetail";

import ReformList from "../pages/postPages/listPages/ReformList";
import ReviewList from "../pages/postPages/listPages/ReviewList";
import QnAList from "../pages/postPages/listPages/QnAList";
import LookbookList from "../pages/postPages/listPages/LookbookList";
import QnADetail from "../pages/postPages/detailPages/QnADetail";
import ReviewDetail from "../pages/postPages/detailPages/ReviewDetail";
import ReformDetail from "../pages/postPages/detailPages/ReformDetail";
import LookbookDetail from "../pages/postPages/detailPages/LookbookDetail";

import WritePost from "../pages/postPages/WritePost";
import EditPost from "../pages/postPages/EditPost";

import ChatFloat from "./ChatFloat";
import ChatModal from "./ChatModal";
// import VideoChat from "../page/VideoChat";

export default function Router() {
  const location = useLocation();

  return (
    <>
      {location.state?.backgroundLocation && (
        <Routes>
          <Route path="chat" element={<ChatModal />} />
          <Route path="chat/:roomId" element={<ChatModal />} />
        </Routes>
      )}
      <Header />
      <MainWrap>
        <ChatFloat />
        <Routes location={location.state?.backgroundLocation || location}>
          {/* <Route path="/" element={<VideoChat />} /> */}
          <Route path="/" element={<Main />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />}>
            <Route path="user" element={<SignupUser />} />
            <Route path="tech" element={<SignupTech />} />
          </Route>
          <Route path="review" element={<ReviewList />} />
          <Route path="review/:category" element={<ReviewList />} />
          <Route path="lookbook" element={<LookbookList />} />
          <Route path="/qna" element={<QnAList />} />
          <Route path="/reform" element={<ReformList />} />
          <Route path="write/:type" element={<WritePost />} />
          <Route path="edit/:type/:id" element={<EditPost />} />
          <Route path="mypage" element={<MyPage />} />
          <Route path="userdetail/:userId" element={<UserDetail />} />
          <Route path="qnadetail/:postId" element={<QnADetail />} />
          <Route path="reviewdetail/:postId" element={<ReviewDetail />} />
          <Route path="reformdetail/:postId" element={<ReformDetail />} />
          <Route path="lookbookdetail/:postId" element={<LookbookDetail />} />
          <Route path="*" element={<Main />} />
        </Routes>
      </MainWrap>
      <Footer />
    </>
  );
}
const MainWrap = styled.main`
  padding-top: 125px;
`;
