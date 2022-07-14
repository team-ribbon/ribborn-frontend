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

  const [infoChange, SetInfoChange] = useState(false);
  const [category, setCategory] = useState("all");

  React.useEffect(() => {
    dispatch(getMyPageDB(category));
  }, []);
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
        user={user}
        qna={qna}
        lookbook={lookbook}
        review={review}
        reform={reform}
      />
    </Template>
  );
}

const Template = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding-top: 40px;
`;

export default MyPage;
