import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useInView } from "react-intersection-observer";

import { getQnAListDB, cleanUpPostList, loadDoneReset } from "../modules/post";
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

  const onClickCategory = (event) => {
    setCategory(event.target.id);
  };

  React.useEffect(() => {
    dispatch(loadDoneReset());
    setPage(0);
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
  }, [category, sort, page]);

  React.useEffect(() => {
    return () => {
      dispatch(cleanUpPostList());
    };
  }, []);

  return (
    <Wrap>
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
      <Buttons>
        <Link to="/write/qna">
          <MainBtn>글쓰기</MainBtn>
        </Link>
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
    </Wrap>
  );
}

const Wrap = styled.div`
  max-width: ${({ theme }) => theme.width.listWidth};
  margin: 0 auto;
  padding: 0 40px;
`;

const Buttons = styled(Category)`
  width: 100%;
  margin: 50px auto;
  display: flex;
  align-items: center;
`;

const PostCoverDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export default QnAList;
