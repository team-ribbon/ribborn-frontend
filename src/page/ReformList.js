import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getReformListDB, cleanUpList } from "../modules/post";
import TextCard from "../components/TextCard";
import CategoryBtn from "../elements/CategoryBtn";

function ReformList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const page = 0;
  const [category, setCategory] = React.useState("all");
  const [process, setProcess] = React.useState("all");
  const [region, setRegion] = React.useState("all");
  const postlists = useSelector((state) => state.post.List.posts);

  const handleProcessSelect = (e) => {
    setProcess(e.target.value);
  };

  const handleRegionSelect = (e) => {
    setRegion(e.target.value);
  };

  React.useEffect(() => {
    dispatch(getReformListDB(category, region, process, page));
  }, [category, region, process, page]);

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
      <div>
        <select name="process" onChange={handleProcessSelect}>
          <option value="all">전체 상태보기</option>
          <option value="before">모집중</option>
          <option value="ing">진행중</option>
          <option value="after">완료</option>
        </select>
        <select name="region" onChange={handleRegionSelect}>
          <option value="all">전체 지역</option>
          <option value="경기권">경기권</option>
          <option value="강원도">강원도</option>
          <option value="충청권">충청권</option>
          <option value="전라권">전라권</option>
          <option value="경상권">경상권</option>
        </select>
      </div>
      <PostCoverDiv>
        <AskBtn>견적 요청하기</AskBtn>
        {postlists.map((v) => {
          return <TextCard postObj={v} key={"post" + v.postId} reform={true} />;
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

export default ReformList;
