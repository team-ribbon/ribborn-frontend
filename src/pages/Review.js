import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import styled from "styled-components";

import {
  getReviewListDB,
  cleanUpPostList,
  loadDoneReset,
} from "../redux/modules/post";

import Sort from "../components/Sort";
import TabWrap from "../components/TabWrap";
import CardA from "../components/CardA";
import { MainBtn, SubBtn, Category } from "../elements/Buttons";
import Categories from "../shared/Categories";
import PagePlaceholder from "../components/PagePlaceholder";

const Review = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const param = useParams();
  const postList = useSelector((state) => state.post.PostList);
  const loadedEverything = useSelector((state) => state.post.loadedEverything);
  const isLogin = useSelector((state) => state.user.isLogin);

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
    if (page === 0) {
      setLoading(true);
      dispatch(getReviewListDB(category, sort, page)).then((res) => {
        setLoading(false);
      });
    } else {
      setPage(0);
    }
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
  }, [page]);

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
        <MainBtn
          onClick={() => {
            if (!isLogin) {
              navigate("/login");
              return false;
            }
            navigate("/write/review");
          }}
        >
          글쓰기
        </MainBtn>
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
      {postList.length === 0 && (
        <PagePlaceholder
          emoji={"😦"}
          content={"검색 결과에 해당하는 게시물이 없습니다."}
        />
      )}
    </Wrap>
  );
};
const Wrap = styled.div`
  max-width: ${({ theme }) => theme.width.listWidth};
  margin: 0 auto;
  padding: 0 16px;
  @media ${({ theme }) => theme.device.mobile} {
    padding: 0 40px;
  }
`;
const Grid = styled.div`
  display: grid;
  grid-gap: 40px;
  grid-template-columns: 1fr;
  margin: 20px 0;
  @media ${({ theme }) => theme.device.mobile} {
    grid-template-columns: repeat(auto-fill, minmax(330px, 1fr));
  }
`;

const Buttons = styled(Category)`
  width: 100%;
  margin: 50px auto;
  display: flex;
  align-items: center;
  max-width: ${({ theme }) => theme.width.listWidth};
`;

export default Review;
