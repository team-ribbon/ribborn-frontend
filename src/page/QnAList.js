import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getQnAListDB, cleanUpList } from "../modules/post";
import TextCard from "../components/TextCard";
import CategoryBtn from "../elements/CategoryBtn";

function QnAList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [category, setCategory] = React.useState("all");
  const postlists = useSelector((state) => state.post.List.posts);

  React.useEffect(() => {
    dispatch(getQnAListDB());
  }, [category]);

  React.useEffect(() => {
    return () => {
      dispatch(cleanUpList());
    };
  }, []);

  return (
    <Template>
      <ButtonDiv>
        <CategoryBtn categorySet={setCategory} />
      </ButtonDiv>
      <PostCoverDiv>
        <AskBtn>질문하기</AskBtn>
        {postlists.map((v) => {
          return <TextCard postObj={v} key={"post" + v.postId} />;
        })}
      </PostCoverDiv>
    </Template>
  );
}

const Template = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ButtonDiv = styled.div`
  width: fit-content;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const PostCoverDiv = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
`;

const AskBtn = styled.button`
  background-color: #ddd;
  border: none;
  margin: 20px 0px;
  width: 100px;
  height: 60px;
  float: left;
  :hover {
    cursor: pointer;
  }
`;

export default QnAList;
