import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { useInView } from "react-intersection-observer";

import {
  getReformListDB,
  cleanUpPostList,
  loadDoneReset,
} from "../modules/post";
import TextCard from "../components/TextCard";
import Categories from "../shared/Categories";
import { SubBtn, Category, MainBtn } from "../elements/Buttons";
import RegionSelect from "../components/RegionSelect";
import ProcessSelect from "../components/ProcessSelect";

function ReformList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [page, setPage] = React.useState(0);
  const [category, setCategory] = React.useState("all");
  const [process, setProcess] = React.useState("all");
  const [region, setRegion] = React.useState("all");
  const [loading, setLoading] = React.useState(true);

  const [inViewRef, inView] = useInView();

  const postlists = useSelector((state) => state.post.PostList);
  const loadedEverything = useSelector((state) => state.post.loadedEverything);

  const onClickCategory = (event) => {
    setCategory(event.target.id);
  };

  useEffect(() => {
    dispatch(loadDoneReset());
    setPage(0);
  }, [category, region, process]);

  React.useEffect(() => {
    if (inView && !loading && !loadedEverything) {
      setPage(page + 1);
    }
  }, [inView]);

  React.useEffect(() => {
    setLoading(true);
    dispatch(getReformListDB(category, region, process, page)).then((res) => {
      setLoading(false);
    });
  }, [category, region, process, page]);

  React.useEffect(() => {
    return () => {
      dispatch(cleanUpPostList());
    };
  }, []);

  return (
    <Wrap>
      <LCategory category={category}>
        {Categories.map((v) => {
          return (
            <SubBtn
              key={"categoryBtn" + v.value}
              id={v.value}
              onClick={onClickCategory}
            >
              {v.text}
            </SubBtn>
          );
        })}
      </LCategory>
      <SelectDiv>
        <ProcessSelect setProcess={setProcess} process={process} />
        <RegionSelect setRegion={setRegion} region={region} />
      </SelectDiv>
      <PostCoverDiv>
        <MainBtnDiv>
          <Link to="/write/reform">
            <MainBtn style={{ marginBottom: "20px" }}>견적 요청하기</MainBtn>
          </Link>
        </MainBtnDiv>

        {postlists.map((v, i) => {
          return i === postlists.length - 1 ? (
            <TextCard
              postObj={v}
              key={"post" + v.id}
              reform={true}
              inViewRef={inViewRef}
            />
          ) : (
            <TextCard postObj={v} key={"post" + v.id} reform={true} />
          );
        })}
      </PostCoverDiv>
    </Wrap>
  );
}

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: ${({ theme }) => theme.width.listWidth};
  margin: 0 auto;
  padding: 0 40px;
`;

const LCategory = styled(Category)`
  margin-top: 30px;
`;

const SelectDiv = styled.div`
  display: flex;
  flex-direction: row;
  max-width: 1100px;
  margin-top: 42px;
  margin-left: auto;
`;

const PostCoverDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const MainBtnDiv = styled.div`
  width: fit-content;
`;

export default ReformList;
