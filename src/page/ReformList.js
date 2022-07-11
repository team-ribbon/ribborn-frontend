import React from "react";
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

  const page = 0;
  const [category, setCategory] = React.useState("all");
  const [process, setProcess] = React.useState("all");
  const [region, setRegion] = React.useState("all");
  const postlists = useSelector((state) => state.post.reformList);

  const onClickCategory = (event) => {
    setCategory(event.target.id);
  };

  React.useEffect(() => {
    dispatch(getReformListDB(category, region, process, page));
  }, [category, region, process, page]);

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
      <SelectDiv>
        <SelectBox left={true} name="process" onChange={handleProcessSelect}>
          <Option value="all">전체 상태보기</Option>
          <Option value="before">모집중</Option>
          <Option value="ing">진행중</Option>
          <Option value="after">완료</Option>
        </SelectBox>
        <SelectBox left={false} name="region" onChange={handleRegionSelect}>
          <option value="all">전체 지역</option>
          <option value="gyeonggi">경기권</option>
          <option value="gangwon">강원도</option>
          <option value="chungcheong">충청권</option>
          <option value="jeolla">전라권</option>
          <option value="gyeongsang">경상권</option>
        </SelectBox>
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
`;

const ButtonDiv = styled.div`
  width: fit-content;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const SelectDiv = styled.div`
  display: flex;
  flex-direction: row;
  width: 70%;
  max-width: 1100px;
`;

const SelectBox = styled.select`
  margin-left: ${(props) => (props.left ? "auto" : "30px")};
  width: ${(props) => (props.left ? "179px" : "164px")};
  height: 28px;
  font-weight: 400;
  font-size: 18px;
  line-height: 20px;
  border-bottom: 2px solid rgba(0, 0, 0, 1);
  border-top: none;
  border-right: none;
  border-left: none;
  :active {
    border: none;
  }
  outline: none;
`;

const Option = styled.option`
  border: none;
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

export default ReformList;
