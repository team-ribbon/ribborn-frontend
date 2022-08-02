import { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { cleanUpMyPage, getMyPageDB } from "../redux/modules/userPage";
import { useNavigate } from "react-router-dom";

import UserInfoCard from "../components/UserInfoCard";
import UserPost from "../components/UserPost";
import InfoChange from "../components/InfoChange";

function MyPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userPage.myPage.users);
  const qna = useSelector((state) => state.userPage.myPage.qnaList);
  const lookbook = useSelector((state) => state.userPage.myPage.lookbookList);
  const review = useSelector((state) => state.userPage.myPage.reviewList);
  const reform = useSelector((state) => state.userPage.myPage.reformList);
  const categoriedPosts = useSelector((state) => state.userPage.myPage.posts);
  const isLogin = useSelector((state) => state.user.isLogin);

  const [infoChange, SetInfoChange] = useState(false);
  const [category, setCategory] = useState("all");

  useEffect(() => {
    if (isLogin === false) {
      navigate("/login");
    }
  }, [isLogin]);
  useEffect(() => {
    if (!infoChange) {
      dispatch(getMyPageDB(category));
    }
  }, [infoChange]);
  useEffect(() => {
    return () => {
      dispatch(cleanUpMyPage());
    };
  }, []);

  return infoChange ? (
    <InfoChange change={SetInfoChange} user={user} setCategory={setCategory} />
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
        myPage={true}
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
  @media all and (min-width: 1000px) {
    flex-direction: row;
    padding: 40px 40px 0 40px;
  }
`;

export default MyPage;
