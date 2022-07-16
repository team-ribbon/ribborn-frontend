import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import styled, { css } from "styled-components";
import CardA from "../components/CardA";
import {
  getReviewListDB,
  cleanUpPostList,
  loadDoneReset,
} from "../modules/post";
import { MainBtn, SubBtn, Category } from "../elements/Buttons";
import Sort from "../components/Sort";
import TabWrap from "../components/TabWrap";
import Categories from "../shared/Categories";

const Review = () => {
  const dispatch = useDispatch();
  const postList = useSelector((state) => state.post.PostList);
  const loadedEverything = useSelector((state) => state.post.loadedEverything);
  const isLogin = useSelector((state) => state.user.isLogin);
  const param = useParams();
  // console.log(postList);

  const [sort, setSort] = useState("createAt");
  const [category, setCategory] = useState(
    param.category === undefined ? "all" : param.category
  );
  const [page, setPage] = useState(0);
  const [loading, setLoading] = React.useState(true);

  const [inViewRef, inView] = useInView();

  const onClickCategory = (event) => {
    setCategory(event.target.id);
  };

  useEffect(() => {
    dispatch(loadDoneReset());
    setPage(0);
  }, [category, sort]);

  React.useEffect(() => {
    if (inView && !loading && !loadedEverything) {
      setPage(page + 1);
    }
  }, [inView]);

  useEffect(() => {
    setLoading(true);
    dispatch(getReviewListDB(category, sort, page)).then((res) => {
      setLoading(false);
    });
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
        {isLogin && (
          <Link to="/write/review">
            <MainBtn>글쓰기</MainBtn>
          </Link>
        )}
        <Sort setSort={setSort} sort={sort} />
      </Buttons>
      <Grid>
        {postList.map((postObj, i) => {
          return i === postList.length - 1 ? (
            <CardA
              postObj={postObj}
              key={postObj.id}
              type="A"
              inViewRef={inViewRef}
            />
          ) : (
            <CardA postObj={postObj} key={postObj.id} type="A" />
          );
        })}
      </Grid>
    </Wrap>
  );
};
const Wrap = styled.div`
  max-width: ${({ theme }) => theme.width.listWidth};
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
