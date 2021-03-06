import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { cleanUpMyPage, getUserDetailDB } from "../redux/modules/userPage";
import { useParams } from "react-router-dom";

import UserInfoCard from "../components/UserInfoCard";
import UserPost from "../components/UserPost";

function UserDetail() {
  const params = useParams();
  const id = params.userId;

  const dispatch = useDispatch();
  const user = useSelector((state) => state.userPage.myPage.users);
  const qna = useSelector((state) => state.userPage.myPage.qnaList);
  const lookbook = useSelector((state) => state.userPage.myPage.lookbookList);
  const review = useSelector((state) => state.userPage.myPage.reviewList);
  const reform = useSelector((state) => state.userPage.myPage.reformList);
  const categoriedPosts = useSelector((state) => state.userPage.myPage.posts);
  const myInfo = useSelector((state) => state.user.user);
  const isLogin = useSelector((state) => state.user.isLogin);

  const [category, setCategory] = useState("all");

  React.useEffect(() => {
    dispatch(getUserDetailDB(id, category));
  }, []);
  React.useEffect(() => {
    return () => {
      dispatch(cleanUpMyPage());
    };
  }, []);

  return (
    <Template>
      <UserInfoCard
        user={user}
        myPage={false}
        myInfo={myInfo}
        isLogin={isLogin}
      />
      <UserPost
        category={category}
        setCategory={setCategory}
        user={user}
        qna={qna}
        lookbook={lookbook}
        review={review}
        reform={reform}
        categoriedPosts={categoriedPosts}
      />
    </Template>
  );
}

const Template = styled.div`
  max-width: ${({ theme }) => theme.width.maxWidth};
  margin: 0 auto;
  padding: 40px 16px 0 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media ${({ theme }) => theme.device.mobile} {
    flex-direction: row;
    padding: 40px 40px 0 40px;
  }
`;

export default UserDetail;
