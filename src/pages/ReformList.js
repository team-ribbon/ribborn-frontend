import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { useInView } from "react-intersection-observer";

import {
  getReformListDB,
  cleanUpPostList,
  loadDoneReset,
} from "../redux/modules/post";

import TextCard from "../components/TextCard";
import RegionSelect from "../components/RegionSelect";
import ProcessSelect from "../components/ProcessSelect";
import { SubBtn, Category, MainBtn } from "../elements/Buttons";
import Categories from "../shared/Categories";

function ReformList() {
  const isLogin = useSelector((state) => state.user.isLogin);
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
  const user = useSelector((state) => state.user.user);

  const onClickCategory = (event) => {
    setCategory(event.target.id);
  };

  useEffect(() => {
    dispatch(loadDoneReset());
    if (page === 0) {
      setLoading(true);
      dispatch(getReformListDB(category, region, process, page)).then((res) => {
        setLoading(false);
      });
    } else {
      setPage(0);
    }
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
  }, [page]);

  React.useEffect(() => {
    return () => {
      dispatch(cleanUpPostList());
    };
  }, []);

  return (
    <Wrap>
      <WidthWrap>
        <LCategory category={category}>
          {Categories.map((v) => {
            return (
              <SubBtn
                key={"categoryBtn" + v.value}
                id={v.value}
                onClick={onClickCategory}
              >
                {v.text + " 견적"}
              </SubBtn>
            );
          })}
        </LCategory>
        <SelectDiv isLogin={isLogin && +user.userType === 0}>
          <ProcessSelect setProcess={setProcess} process={process} />
          <RegionSelect setRegion={setRegion} region={region} />
        </SelectDiv>
      </WidthWrap>
      <PostCoverDiv>
        <WidthWrap>
          <MainBtnDiv>
            <MainBtn
              onClick={() => {
                if (!isLogin) {
                  navigate("/login");
                  return false;
                }
                if (+user.userType !== 0) {
                  alert("일반 회원만 작성할 수 있는 페이지입니다!");
                  return false;
                }
                navigate("/write/reform");
              }}
              style={{ marginBottom: "20px" }}
            >
              견적 요청하기
            </MainBtn>
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
        </WidthWrap>
      </PostCoverDiv>
    </Wrap>
  );
}

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
`;

const WidthWrap = styled.div`
  max-width: ${({ theme }) => theme.width.listWidth};
  width: 100%;
  margin: 0 auto;
  padding: 0 16px;
  @media ${({ theme }) => theme.device.mobile} {
    padding: 0 40px;
  }
`;

const LCategory = styled(Category)`
  margin-top: 30px;
  gap: 10px;
  max-width: ${({ theme }) => theme.width.listWidth};
`;

const SelectDiv = styled.div`
  display: flex;
  flex-direction: row;
  max-width: 1100px;
  margin-top: 42px;
  margin-left: auto;
  margin-bottom: 30px;
  justify-content: end;
`;

const PostCoverDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 30px 0 0 0;
  background-color: ${({ theme }) => theme.colors.lighterGray};
`;

const MainBtnDiv = styled.div`
  width: fit-content;
`;

export default ReformList;
