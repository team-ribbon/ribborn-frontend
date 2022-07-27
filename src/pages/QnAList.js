import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useInView } from "react-intersection-observer";

import {
  getQnAListDB,
  cleanUpPostList,
  loadDoneReset,
} from "../redux/modules/post";

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
  const [loading, setLoading] = React.useState(true);

  const [inViewRef, inView] = useInView();

  const postlists = useSelector((state) => state.post.PostList);
  const loadedEverything = useSelector((state) => state.post.loadedEverything);
  const isLogin = useSelector((state) => state.user.isLogin);

  const onClickCategory = (event) => {
    setCategory(event.target.id);
  };

  React.useEffect(() => {
    dispatch(loadDoneReset());
    if (page === 0) {
      setLoading(true);
      dispatch(getQnAListDB(category, sort, page)).then((res) => {
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

  React.useEffect(() => {
    setLoading(true);
    dispatch(getQnAListDB(category, sort, page)).then((res) => {
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
      <GreyWrap>
        <WidthWrap>
          <TabWrap review={false} />
          <Category category={category}>
            {Categories.map((v) => {
              return (
                <SubBtn id={v.value} onClick={onClickCategory}>
                  {v.text}
                </SubBtn>
              );
            })}
          </Category>
        </WidthWrap>
      </GreyWrap>
      <WidthWrap>
        <Buttons>
          <MainBtn
            onClick={() => {
              if (!isLogin) {
                navigate("/login");
                return false;
              }
              navigate("/write/qna");
            }}
          >
            글쓰기
          </MainBtn>
          <Sort setSort={setSort} sort={sort} />
        </Buttons>
        <PostCoverDiv>
          {postlists.map((v, i) => {
            return i === postlists.length - 1 ? (
              <TextCard postObj={v} key={"post" + v.id} inViewRef={inViewRef} />
            ) : (
              <TextCard postObj={v} key={"post" + v.id} />
            );
          })}
        </PostCoverDiv>
      </WidthWrap>
    </Wrap>
  );
}

const Wrap = styled.div`
  margin: -20px auto;
`;

const GreyWrap = styled.div`
  width: 100%;
  padding: 20px 0 30px 0;
  background-color: ${({ theme }) => theme.colors.lighterGray};
`;

const WidthWrap = styled.div`
  max-width: ${({ theme }) => theme.width.listWidth};
  margin: 0 auto;
  padding: 0 16px;
  @media ${({ theme }) => theme.device.mobile} {
    padding: 0 40px;
  }
`;

const Buttons = styled(Category)`
  width: 100%;
  margin: 20px auto;
  display: flex;
  align-items: center;
  max-width: ${({ theme }) => theme.width.listWidth};
`;

const PostCoverDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export default QnAList;
