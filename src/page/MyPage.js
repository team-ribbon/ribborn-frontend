import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { cleanUpMyPage, getMyPageDB } from "../modules/UserPage";

import UserInfoCard from "../components/UserInfoCard";
import UserPost from "../components/UserPost";
import InfoChange from "../components/InfoChange";

function MyPage() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.UserPage.myPage.users);
  const qna = useSelector((state) => state.UserPage.myPage.qnaList);
  const lookbook = useSelector((state) => state.UserPage.myPage.lookbookList);
  const review = useSelector((state) => state.UserPage.myPage.reviewList);
  const reform = useSelector((state) => state.UserPage.myPage.reformList);
  const categoriedPosts = useSelector((state) => state.UserPage.myPage.posts);

  const [infoChange, SetInfoChange] = useState(false);
  const [category, setCategory] = useState("all");

  React.useEffect(() => {
    dispatch(getMyPageDB(category));
  }, [category]);
  React.useEffect(() => {
    return () => {
      dispatch(cleanUpMyPage());
    };
  }, []);

  return infoChange ? (
    <InfoChange change={SetInfoChange} user={user} />
  ) : (
    <Template>
      <UserInfoCard user={user} myPage={true} change={SetInfoChange} />
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
  padding: 40px 40px 0 40px;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

export default MyPage;
