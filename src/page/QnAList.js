import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import { getQnAListDB } from "../modules/post";
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
  const postlists = useSelector((state) => state.post.PostList);

  const onClickCategory = (event) => {
    setCategory(event.target.id);
  };

  React.useEffect(() => {
    setPage(0);
  }, [category, sort]);

  React.useEffect(() => {
    dispatch(getQnAListDB(category, sort, page));
  }, [category, sort, page]);

  // React.useEffect(() => {
  //   return () => {
  //     dispatch(cleanUpList());
  //   };
  // }, []);

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
        {postlists.map((v) => {
          return <TextCard postObj={v} key={"post" + v.id} />;
        })}
      </PostCoverDiv>
    </Wrap>
  );
}

const Wrap = styled.div`
  width: 70%;
  max-width: 1100px;
  max-width: ${({ theme }) => theme.width.maxWidth};
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
