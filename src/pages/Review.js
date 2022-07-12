import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
import CardA from "../components/CardA";
import { getReviewListDB, cleanUpPostList } from "../modules/post";
import { MainBtn, SubBtn, Category } from "../elements/Buttons";
import Sort from "../components/Sort";
import TabWrap from "../components/TabWrap";
import Categories from "../shared/Categories";

const Review = () => {
  const dispatch = useDispatch();
  const postList = useSelector((state) => state.post.PostList);
  // console.log(postList);

  const [sort, setSort] = useState("createAt");
  const [category, setCategory] = useState("all");
  const [page, setPage] = useState(0);

  const onClickCategory = (event) => {
    setCategory(event.target.id);
  };

  useEffect(() => {
    setPage(0);
  }, [category, sort]);

  useEffect(() => {
    dispatch(getReviewListDB(category, sort, page));
  }, [category, sort, page]);

  React.useEffect(() => {
    return () => {
      dispatch(cleanUpPostList());
    };
  }, []);

  return (
    <Wrap>
      <TabWrap review={true} />
      <Category category={category}>
        {Categories.map((v) => {
          return (
            <SubBtn id={v.value} onClick={onClickCategory}>
              {v.text}
            </SubBtn>
          );
        })}
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

const Buttons = styled(Category)`
  width: 100%;
  margin: 50px auto;
  display: flex;
  align-items: center;
`;

export default Review;
