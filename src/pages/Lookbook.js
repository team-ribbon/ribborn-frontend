import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CardB from "../components/CardB";
import Sort from "../components/Sort";
import { getLookbookListDB } from "../modules/post";
import styled from "styled-components";
import { MainBtn, SubBtn, Category } from "../elements/Buttons";
import Categories from "../shared/Categories";

const Lookbook = () => {
  const dispatch = useDispatch();
  const postList = useSelector((state) => state.post.lookbookList);

  const [sort, setSort] = useState("likeCount");
  const [category, setCategory] = useState("all");

  const onClickCategory = (event) => {
    setCategory(event.target.id);
  };

  useEffect(() => {
    dispatch(getLookbookListDB(category, sort));
    console.log("dispatched");
  }, [category, sort]);

  return (
    <Wrap>
      <TopWrap>
        <LCategory category={category}>
          <SubBtn id="all" onClick={onClickCategory}>
            전체
          </SubBtn>
          <SubBtn id="clothes" onClick={onClickCategory}>
            옷 룩북
          </SubBtn>
          <SubBtn id="furniture" onClick={onClickCategory}>
            가구 룩북
          </SubBtn>
          <SubBtn id="shoes" onClick={onClickCategory}>
            신발 룩북
          </SubBtn>
          <SubBtn id="bags" onClick={onClickCategory}>
            가방 룩북
          </SubBtn>
          <SubBtn id="goods" onClick={onClickCategory}>
            기타 룩북
          </SubBtn>
        </LCategory>
        <Sort setSort={setSort} sort={sort} />
      </TopWrap>
      <Link to="/write/lookbook">
        <MainBtn style={{ marginBottom: "30px" }}>룩북 올리기</MainBtn>
      </Link>
      <Grid>
        {postList.map((postObj, index) => (
          <CardB
            postObj={postObj}
            key={postObj.id}
            hot={index < 6 && sort === "popular"}
            isMain={false}
          />
        ))}
      </Grid>
    </Wrap>
  );
};
const Wrap = styled.div`
  max-width: ${({ theme }) => theme.width.maxWidth};
  margin: 0 auto 60px auto;
  padding: 0 40px;
`;
const TopWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 60px;
`;
const LCategory = styled(Category)`
  margin: 30px 0;
`;
const Grid = styled.div`
  display: grid;
  grid-gap: 40px;
  grid-template-columns: repeat(auto-fill, minmax(450px, 1fr));
  margin: 20px auto;
`;

export default Lookbook;
