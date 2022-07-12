import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getReformListDB } from "../modules/post";
import TextCard from "../components/TextCard";
import Categories from "../shared/Categories";
import { SubBtn, Category } from "../elements/Buttons";
import RegionSelect from "../components/RegionSelect";
import ProcessSelect from "../components/ProcessSelect";

function ReformList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [page, setPage] = React.useState(0);
  const [category, setCategory] = React.useState("all");
  const [process, setProcess] = React.useState("all");
  const [region, setRegion] = React.useState("all");
  const postlists = useSelector((state) => state.post.PostList);

  const onClickCategory = (event) => {
    setCategory(event.target.id);
  };

  useEffect(() => {
    setPage(0);
  }, [category, region, process]);

  React.useEffect(() => {
    dispatch(getReformListDB(category, region, process, page));
  }, [category, region, process, page]);

  // React.useEffect(() => {
  //   return () => {
  //     dispatch(cleanUpList());
  //   };
  // }, []);

  return (
    <Wrap>
      <Category category={category}>
        {Categories.map((v) => {
          return (
            <SubBtn
              key={"categoryBtn" + v.value}
              id={v.value}
              onClick={onClickCategory}
            >
              {v.text}
            </SubBtn>
          );
        })}
      </Category>
      <SelectDiv>
        <ProcessSelect setProcess={setProcess} process={process} />
        <RegionSelect setRegion={setRegion} region={region} />
      </SelectDiv>
      <PostCoverDiv>
        <AskBtn>견적 요청하기</AskBtn>
        {postlists.map((v) => {
          return <TextCard postObj={v} key={"post" + v.id} reform={true} />;
        })}
      </PostCoverDiv>
    </Wrap>
  );
}

const Wrap = styled.div`
  width: 70%;
  max-width: 1100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: ${({ theme }) => theme.width.maxWidth};
  margin: 0 auto;
  padding: 0 40px;
`;

const SelectDiv = styled.div`
  display: flex;
  flex-direction: row;
  max-width: 1100px;
  margin-top: 42px;
  margin-left: auto;
`;

const PostCoverDiv = styled.div`
  width: 100%;
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

export default ReformList;
