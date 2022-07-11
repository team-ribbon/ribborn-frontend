import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import { getQnAListDB } from "../modules/post";
import TextCard from "../components/TextCard";
import TabWrap from "../components/TabWrap";
import Sort from "../components/Sort";
import Categories from "../shared/Categories";
import { MainBtn, SubBtn, Category } from "../elements/Buttons";

function QnAList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [category, setCategory] = React.useState("all");
  const [sort, setSort] = React.useState("createAt");
  const [page, setPage] = React.useState(0);
  const postlists = useSelector((state) => state.post.qnaList);

  const onClickCategory = (event) => {
    setCategory(event.target.id);
  };

  React.useEffect(() => {
    dispatch(getQnAListDB(category, sort, page));
  }, [category, sort, page]);

  // React.useEffect(() => {
  //   return () => {
  //     dispatch(cleanUpList());
  //   };
  // }, []);

  return (
    <Template>
      <ButtonDiv>
        <CategoryBtn categorySet={setCategory} category={category} />
      </ButtonDiv>
      <PostCoverDiv>
        <AskBtn>질문하기</AskBtn>
        {postlists.map((v) => {
          return <TextCard postObj={v} key={"post" + v.id} />;
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
  max-width: 1100px;
  display: flex;
  flex-direction: column;
`;

const AskBtn = styled.button`
  background-color: #ff8c28;
  color: white;
  font-weight: 700;
  font-size: 18px;
  line-height: 24px;
  border: none;
  margin: 20px 0px;
  width: 170px;
  height: 74px;
  border-radius: 15px;
  float: left;
  :hover {
    cursor: pointer;
  }
`;

export default QnAList;
