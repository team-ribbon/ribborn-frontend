import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useInView } from "react-intersection-observer";

import CardB from "../components/CardB";
import Sort from "../components/Sort";
import {
  getLookbookListDB,
  cleanUpPostList,
  loadDoneReset,
} from "../redux/modules/post";
import styled from "styled-components";
import { MainBtn, SubBtn, Category } from "../elements/Buttons";
import Categories from "../shared/Categories";

const Lookbook = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const postList = useSelector((state) => state.post.PostList);
  const loadedEverything = useSelector((state) => state.post.loadedEverything);
  const isLogin = useSelector((state) => state.user.isLogin);
  const user = useSelector((state) => state.user.user);

  const [sort, setSort] = useState("likeCount");
  const [category, setCategory] = useState("all");
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
      dispatch(getLookbookListDB(category, sort, page)).then((res) => {
        setLoading(false);
      });
    } else {
      setPage(0);
    }
  }, [category, sort]);

  useEffect(() => {
    if (inView && !loading && !loadedEverything) {
      setPage(page + 1);
    }
  }, [inView]);

  useEffect(() => {
    setLoading(true);
    dispatch(getLookbookListDB(category, sort, page)).then((res) => {
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
      <TopWrap>
        <LCategory category={category}>
          {Categories.map((v) => {
            return (
              <SubBtn id={v.value} onClick={onClickCategory}>
                {v.text}
              </SubBtn>
            );
          })}
        </LCategory>
        <Sort setSort={setSort} sort={sort} />
      </TopWrap>
      {+user?.userType === 1 && (
        <MainBtn
          onClick={() => {
            if (!isLogin) {
              navigate("/login");
              return false;
            }
            if (+user.userType !== 1) {
              alert("기술자 회원만 작성할 수 있는 페이지입니다!");
              return false;
            }
            navigate("/write/lookbook");
          }}
          style={{ marginBottom: "30px" }}
        >
          룩북 올리기
        </MainBtn>
      )}
      <Grid>
        {postList.map((postObj, index) =>
          index === postList.length - 1 ? (
            <CardB
              postObj={postObj}
              key={"lookbookPosts" + postObj.id}
              hot={index < 6 && sort === "likeCount"}
              isMain={false}
              inViewRef={inViewRef}
            />
          ) : (
            <CardB
              postObj={postObj}
              key={"lookbookPosts" + postObj.id}
              hot={index < 6 && sort === "likeCount"}
              isMain={false}
            />
          )
        )}
      </Grid>
    </Wrap>
  );
};
const Wrap = styled.div`
  max-width: ${({ theme }) => theme.width.listWidth};
  margin: 0 auto 60px auto;
  padding: 0 16px;
  @media ${({ theme }) => theme.device.mobile} {
    padding: 0 40px;
  }
`;
const TopWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 60px;
  flex-direction: column;
  @media all and (min-width: 1050px) {
    flex-direction: row;
  }
`;
const LCategory = styled(Category)`
  margin: 30px 0;
`;
const Grid = styled.div`
  display: grid;
  grid-gap: 40px;
  grid-template-columns: 1fr;
  margin: 20px auto;
  @media ${({ theme }) => theme.device.mobile} {
    grid-template-columns: repeat(auto-fill, minmax(450px, 1fr));
  }
`;

export default Lookbook;
