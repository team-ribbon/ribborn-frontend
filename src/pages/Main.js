import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import MainSection from "../components/MainSection";
import DesignSection from "../components/DesignSection";
import { getMainDB } from "../modules/post";

const Main = () => {
  const contents = useSelector((state) => state.post.mainContents);

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getMainDB());
  }, []);

  return (
    <main>
      <Link to={contents.banner.toUrl}>
        <BannerWrap>
          <Banner src={contents.banner.image} type="A" />
        </BannerWrap>
      </Link>
      <MainWrap>
        <Nav>
          <Link to="/lookbook">
            <div>
              <TrendButton>
                <NewTrend>NEW TREND</NewTrend>
              </TrendButton>
              <span>뉴 트렌드 리폼 🎵</span>
            </div>
          </Link>
          <Link to="/review/clothes">
            <div>
              <NavButton />
              <span>옷 리뷰</span>
            </div>
          </Link>
          <Link to="/review/furniture">
            <div>
              <NavButton />
              <span>가구 리뷰</span>
            </div>
          </Link>
          <Link to="/review/shoes">
            <div>
              <NavButton />
              <span>신발 리뷰</span>
            </div>
          </Link>
          <Link to="/review/bags">
            <div>
              <NavButton />
              <span>가방 리뷰</span>
            </div>
          </Link>
          <Link to="/review/goods">
            <div>
              <NavButton />
              <span>기타 리뷰</span>
            </div>
          </Link>
          <Link to="/qna">
            <div>
              <NavButton>
                <Community>COMMUNITY</Community>
              </NavButton>
              <span>질문과 답변</span>
            </div>
          </Link>
          <Link to="/">
            <div>
              <NavButton>
                <Community>Service Guide</Community>
              </NavButton>
              <span>리본 이용 가이드</span>
            </div>
          </Link>
        </Nav>
      </MainWrap>
      <CO2>
        <span>
          누적 {contents.co2.count}건의 리본으로 인해
          <br />
          탄소배출을 {contents.co2.co2Reduce}kg 줄였습니다.
        </span>
      </CO2>
      <MainWrap>
        <MainSection
          type="A"
          title="금손 장인 ✌🏻"
          url=""
          postList={contents.reviewList}
        />
      </MainWrap>
      <DesignSection postList={contents.lookbookList} />
      <Link to={contents.banner.toUrl}>
        <BannerWrap>
          <Banner src={contents.banner.image} type="B" />
        </BannerWrap>
      </Link>
      <MainWrap>
        <MainSection
          type="C"
          title="오늘의 견적 ⚡️"
          url=""
          postList={contents.reformList}
        />
      </MainWrap>
    </main>
  );
};

const MainWrap = styled.div`
  max-width: ${({ theme }) => theme.width.maxWidth};
  padding: 50px 40px 0 40px;
  margin: 0 auto;
`;
const BannerWrap = styled.div`
  max-width: ${({ theme }) => theme.width.maxWidth};
  margin: 0 auto;
`;
const Banner = styled.img`
  height: ${({ type }) => (type === "A" ? "480px" : "350px")};
  width: 100%;
  object-fit: cover;
`;

const Nav = styled.nav`
  display: grid;
  grid-gap: 16px;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  text-align: center;
  margin-bottom: 50px;
`;
const NavButton = styled.div`
  background-color: ${({ theme }) => theme.colors.lightGray};
  border-radius: 15px;
  width: 100%;
  height: 100px;
  margin-bottom: 24px;
`;

const CO2 = styled.div`
  margin: 0 auto;
  max-width: ${({ theme }) => theme.width.maxWidth};
  height: 200px;
  background-color: #64bf74;
  position: relative;
  text-align: center;
  font-size: ${({ theme }) => theme.fontSizes.xl};

  span {
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
  }
`;

export default Main;
