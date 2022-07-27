import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";

// import VideoChat from "../page/VideoChat";
import QnAList from "../pages/QnAList";
import ReformList from "../pages/ReformList";
import Header from "./Header";
import Main from "../pages/Main";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import SignupTech from "./SignupTech";
import SignupUser from "./SignupUser";
import Review from "../pages/Review";
import MyPage from "../pages/MyPage";
import UserDetail from "../pages/UserDetail";
import QnADetail from "../pages/QnADetail";
import ReviewDetail from "../pages/ReviewDetail";
import ReformDetail from "../pages/ReformDetail";
import LookBookDetail from "../pages/LookBookDetail";
import Lookbook from "../pages/Lookbook";
import WritePost from "../pages/WritePost";
import EditPost from "../pages/EditPost";
import styled from "styled-components";
import Footer from "./Footer";
import ChatFloat from "./ChatFloat";
import ChatModal from "./ChatModal";
import PostComplete from "../pages/PostComplete";
import Faq from "../pages/Faq";

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
            {/* <Route path="tech" element={<SignupTech />} /> */}
          </Route>
          <Route path="signup/tech" element={<Signup />} />
          <Route path="review" element={<Review />} />
          <Route path="review/:category" element={<Review />} />
          <Route path="lookbook" element={<Lookbook />} />
          <Route path="/qna" element={<QnAList />} />
          <Route path="/reform" element={<ReformList />} />
          <Route path="write/:type" element={<WritePost />} />
          <Route path="edit/:type/:id" element={<EditPost />} />
          <Route path="mypage" element={<MyPage />} />
          <Route path="userdetail/:userId" element={<UserDetail />} />
          <Route path="qnadetail/:postId" element={<QnADetail />} />
          <Route path="reviewdetail/:postId" element={<ReviewDetail />} />
          <Route path="reformdetail/:postId" element={<ReformDetail />} />
          <Route path="lookbookdetail/:postId" element={<LookBookDetail />} />
          <Route path="complete" element={<PostComplete />} />
          <Route path="faq" element={<Faq />} />
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
