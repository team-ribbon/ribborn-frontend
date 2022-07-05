import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { cleanUpMyPage, getUserDetailDB } from "../modules/UserPage";
import { useParams } from "react-router-dom";

import UserInfoCard from "../components/UserInfoCard";
import UserPost from "../components/UserPost";

function UserDetail() {
  const params = useParams();
  const id = params.userId;

  const dispatch = useDispatch();
  const user = useSelector((state) => state.UserPage.myPage.users);
  const qna = useSelector((state) => state.UserPage.myPage.qna);
  const lookbook = useSelector((state) => state.UserPage.myPage.lookbook);
  const review = useSelector((state) => state.UserPage.myPage.review);
  const reform = useSelector((state) => state.UserPage.myPage.reform);

  React.useEffect(() => {
    dispatch(getUserDetailDB(id));
  }, []);
  React.useEffect(() => {
    return () => {
      dispatch(cleanUpMyPage());
    };
  }, []);

  return (
    <Template>
      <UserInfoCard user={user} myPage={false} />
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

export default UserDetail;
