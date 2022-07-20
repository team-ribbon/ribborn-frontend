import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";

import MainSection from "../../components/MainSection";
import DesignSection from "../../components/DesignSection";
import { getMainDB } from "../../redux/modules/post";

const Main = () => {
  const contents = useSelector((state) => state.post.mainContents);

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getMainDB());
  }, []);

  return (
    <main>
      {/* <Link to={contents.banner.toUrl}> */}
      <BannerWrap>
        <Banner src={contents.banner} type="A" />
      </BannerWrap>
      {/* </Link> */}
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
              <NavButton>
                <ClothesImg src="./Clothes.png" />
              </NavButton>
              <span>옷 리뷰</span>
            </div>
          </Link>
          <Link to="/review/furniture">
            <div>
              <NavButton>
                <FurnituresImg src="./Furnitures.png" />
              </NavButton>
              <span>가구 리뷰</span>
            </div>
          </Link>
          <Link to="/review/shoes">
            <div>
              <NavButton>
                <ShoesImg src="./Shoes.png" />
              </NavButton>
              <span>신발 리뷰</span>
            </div>
          </Link>
          <Link to="/review/bags">
            <div>
              <NavButton>
                <BagsImg src="./Bags.png" />
              </NavButton>
              <span>가방 리뷰</span>
            </div>
          </Link>
          <Link to="/review/goods">
            <div>
              <NavButton>
                <GoodsImg src="./Goods.png" />
              </NavButton>
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
          누적 {contents.co2Count}건의 리본으로 인해
          <br />
          탄소배출을 {contents.co2Reduce}kg 줄였습니다.
        </span>
      </CO2>
      <MainWrap>
        <MainSection
          type="A"
          title="금손 장인 ✌🏻"
          url="/review"
          postList={contents.reviewList}
        />
      </MainWrap>
      <DesignSection postList={contents.lookbookList} />
      {/* <Link to={contents.banner.toUrl}> */}
      <BannerWrap>
        <Banner src={contents.banner} type="B" />
      </BannerWrap>
      {/* </Link> */}
      <MainWrap>
        <MainSection
          type="C"
          title="오늘의 견적 ⚡️"
          url="/reform"
          postList={contents.reformList}
        />
      </MainWrap>
    </main>
  );
};

const MainWrap = styled.div`
  max-width: ${({ theme }) => theme.width.maxWidth};
  padding: 50px 40px 0 40px;
  margin: 0 auto 0 auto;
  font-weight: 400;
  font-size: ${({ theme }) => theme.fontSizes.m};
  line-height: 18px;
`;
const BannerWrap = styled.div`
  max-width: ${({ theme }) => theme.width.maxWidth};
  margin: 10px auto 0 auto;
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

const TrendButton = styled.div`
  background: linear-gradient(
    263.38deg,
    #322f5a 4.35%,
    #fc8d28 20.95%,
    #f28e28 31.89%,
    #07ad1f 102.29%
  );
  border-radius: 15px;
  width: 100%;
  height: 100px;
  margin-bottom: 24px;
  padding-top: 35px;
`;
const NewTrend = styled.span`
  font-weight: 700;
  font-size: ${({ theme }) => theme.fontSizes.l};
  line-height: 32px;
  color: #fff;
`;
const Community = styled.span`
  font-weight: 700;
  font-size: ${({ theme }) => theme.fontSizes.l};
  line-height: 32px;
`;
const NavButton = styled.div`
  background-color: ${({ theme }) => theme.colors.lightGray};
  border-radius: 15px;
  width: 100%;
  height: 100px;
  margin-bottom: 24px;
  font-weight: 700;
  font-size: ${({ theme }) => theme.fontSizes.l};
  line-height: 32px;
  padding-top: 35px;
  position: relative;
`;

const ClothesImg = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 108px;
  height: 55px;
`;

const FurnituresImg = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 94px;
  height: 70px;
`;

const ShoesImg = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 88px;
  height: 70px;
`;

const BagsImg = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 95px;
  height: 70px;
`;

const GoodsImg = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 71px;
  height: 73px;
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
