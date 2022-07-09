import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
import CardA from "../components/CardA";
import { getReviewListDB } from "../modules/post";
import { MainBtn, SubBtn, Category } from "../elements/Buttons";
import Sort from "../components/Sort";

const Review = () => {
  const dispatch = useDispatch();
  const postList = useSelector((state) => state.post.reviewList);
  // console.log(postList);

  const [sort, setSort] = useState("popular");
  const [category, setCategory] = useState("all");

  const onClickCategory = (event) => {
    setCategory(event.target.id);
    // dispatch(getReviewListDB(category,"popular"))
  };

  useEffect(() => {
    // dispatch(getReviewListDB(category, sort));
  }, [category, sort]);

  return (
    <Wrap>
      <TabWrap>
        <Link to="/review">
          <ActiveTab>리폼 리뷰</ActiveTab>
        </Link>
        <Link to="">
          <Tab>질문과 답변</Tab>
        </Link>
      </TabWrap>
      <Category category={category}>
        <SubBtn id="all" onClick={onClickCategory}>
          전체
        </SubBtn>
        <SubBtn id="clothes" onClick={onClickCategory}>
          옷 리뷰
        </SubBtn>
        <SubBtn id="furniture" onClick={onClickCategory}>
          가구 리뷰
        </SubBtn>
        <SubBtn id="shoes" onClick={onClickCategory}>
          신발 리뷰
        </SubBtn>
        <SubBtn id="bags" onClick={onClickCategory}>
          가방 리뷰
        </SubBtn>
        <SubBtn id="goods" onClick={onClickCategory}>
          기타 리뷰
        </SubBtn>
      </Category>
      <Buttons>
        <Link to="/write/review">
          <MainBtn>글쓰기</MainBtn>
        </Link>
        <Sort setSort={setSort} sort={sort} />
      </Buttons>
      <Grid>
        {postList.map((postObj) => {
          return <CardA postObj={postObj} key={postObj.id} type="A" />;
        })}
      </Grid>
    </Wrap>
  );
};
const Wrap = styled.div`
  max-width: ${({ theme }) => theme.width.maxWidth};
  margin: 0 auto;
  padding: 0 40px;
`;
const Grid = styled.div`
  display: grid;
  grid-gap: 40px;
  grid-template-columns: repeat(auto-fill, minmax(330px, 1fr));
  margin: 20px 0;
`;
const TabWrap = styled.div`
  text-align: center;
  margin: 40px 0;
`;
const Tab = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  margin: 0 25px;
`;
const ActiveTab = styled(Tab)`
  border-bottom: 3px solid black;
  font-weight: 700;
  padding-bottom: 7px;
`;
const Buttons = styled(Category)`
  width: 100%;
  margin: 50px auto;
  display: flex;
  align-items: center;
`;

export default Review;
