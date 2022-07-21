import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import MainSection from "../components/MainSection";
import DesignSection from "../components/DesignSection";
import { getMainDB } from "../redux/modules/post";

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
              <MobileTrendButton>
                <NewTrend>NEW</NewTrend>
              </MobileTrendButton>
              <DesktopNavSpan>뉴 트렌드 리폼 🎵</DesktopNavSpan>
              <MobileNavSpan>뉴 트렌드 리폼</MobileNavSpan>
            </div>
          </Link>
          <Link to="/review/clothes">
            <div>
              <NavButton>
                <ClothesImg src="./Clothes.png" />
              </NavButton>
              <NavSpan>옷 리뷰</NavSpan>
            </div>
          </Link>
          <Link to="/review/furniture">
            <div>
              <NavButton>
                <FurnituresImg src="./Furnitures.png" />
              </NavButton>
              <NavSpan>가구 리뷰</NavSpan>
            </div>
          </Link>
          <Link to="/review/shoes">
            <div>
              <NavButton>
                <ShoesImg src="./Shoes.png" />
              </NavButton>
              <NavSpan>신발 리뷰</NavSpan>
            </div>
          </Link>
          <Link to="/review/bags">
            <div>
              <NavButton>
                <BagsImg src="./Bags.png" />
              </NavButton>
              <NavSpan>가방 리뷰</NavSpan>
            </div>
          </Link>
          <Link to="/review/goods">
            <div>
              <NavButton>
                <GoodsImg src="./Goods.png" />
              </NavButton>
              <NavSpan>기타 리뷰</NavSpan>
            </div>
          </Link>
          <Link to="/qna">
            <div>
              <NavButton>
                <DesktopCommunity>COMMUNITY</DesktopCommunity>
                <MobileCommunity>COMM- UNITY</MobileCommunity>
              </NavButton>
              <NavSpan>질문과 답변</NavSpan>
            </div>
          </Link>
          <Link to="/">
            <div>
              <NavButton>
                <Community>Service Guide</Community>
              </NavButton>
              <DesktopNavSpan>리본 이용 가이드</DesktopNavSpan>
              <MobileNavSpan>이용 가이드</MobileNavSpan>
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
  text-align: center;
  margin-bottom: 50px;
  justify-content: center;
  grid-template-columns: 75px 75px 75px 75px;
  @media all and (max-width: 370px) {
    grid-template-columns: repeat(auto-fill, 75px);
  }
  @media all and (min-width: 768px) and (max-width: 900px) {
    grid-template-columns: 140px 140px 140px 140px;
  }
  @media all and (min-width: 900px) and (max-width: 1312px) {
    grid-template-columns: 180px 180px 180px 180px;
  }
  @media all and (min-width: 1312px) {
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  }
`;

const NavSpan = styled.span`
  font-weight: 400;
  font-size: ${({ theme }) => theme.fontSizes.s};
  line-height: 14px;
  @media ${({ theme }) => theme.device.mobile} {
    font-size: ${({ theme }) => theme.fontSizes.m};
    line-height: 18px;
  }
`;

const DesktopNavSpan = styled.div`
  display: none;
  font-weight: 400;
  font-size: ${({ theme }) => theme.fontSizes.m};
  line-height: 18px;
  @media ${({ theme }) => theme.device.mobile} {
    display: initial;
  }
`;

const MobileNavSpan = styled.div`
  font-weight: 400;
  font-size: ${({ theme }) => theme.fontSizes.s};
  line-height: 14px;
  @media ${({ theme }) => theme.device.mobile} {
    display: none;
  }
`;

const TrendButton = styled.div`
  display: none;
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
  @media ${({ theme }) => theme.device.mobile} {
    display: inherit;
  }
`;

const MobileTrendButton = styled.div`
  display: inherit;
  background: linear-gradient(
    263.38deg,
    #322f5a 4.35%,
    #fc8d28 20.95%,
    #f28e28 31.89%,
    #07ad1f 102.29%
  );
  border-radius: 63px;
  width: 63px;
  height: 63px;
  margin-bottom: 24px;
  padding-top: 16px;
  @media ${({ theme }) => theme.device.mobile} {
    display: none;
  }
`;

const NewTrend = styled.span`
  font-weight: 700;
  font-size: ${({ theme }) => theme.fontSizes.l};
  line-height: 32px;
  color: #fff;
`;
const Community = styled.span`
  font-weight: 700;
  font-size: ${({ theme }) => theme.fontSizes.s};
  line-height: 14px;
  @media ${({ theme }) => theme.device.mobile} {
    font-size: ${({ theme }) => theme.fontSizes.l};
    line-height: 32px;
  }
`;

const DesktopCommunity = styled.span`
  display: none;
  @media ${({ theme }) => theme.device.mobile} {
    display: inherit;
    font-weight: 700;
    font-size: ${({ theme }) => theme.fontSizes.l};
    line-height: 32px;
  }
`;

const MobileCommunity = styled.span`
  font-weight: 700;
  font-size: ${({ theme }) => theme.fontSizes.s};
  line-height: 14px;
  @media ${({ theme }) => theme.device.mobile} {
    display: none;
  }
`;

const NavButton = styled.div`
  width: 63px;
  height: 63px;
  border-radius: 63px;
  background-color: ${({ theme }) => theme.colors.lightGray};
  margin-bottom: 24px;
  font-weight: 700;
  font-size: ${({ theme }) => theme.fontSizes.l};
  line-height: 16px;
  padding-top: 15px;
  position: relative;
  @media ${({ theme }) => theme.device.mobile} {
    width: 100%;
    height: 100px;
    border-radius: 15px;
    padding-top: 35px;
    line-height: 32px;
  }
`;

const ClothesImg = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 43px;
  height: 22px;
  @media ${({ theme }) => theme.device.mobile} {
    width: 108px;
    height: 55px;
  }
`;

const FurnituresImg = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 43px;
  height: 23px;
  @media ${({ theme }) => theme.device.mobile} {
    width: 94px;
    height: 70px;
  }
`;

const ShoesImg = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 42px;
  height: 30px;
  @media ${({ theme }) => theme.device.mobile} {
    width: 88px;
    height: 70px;
  }
`;

const BagsImg = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 37px;
  height: 23px;
  @media ${({ theme }) => theme.device.mobile} {
    width: 95px;
    height: 70px;
  }
`;

const GoodsImg = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 38px;
  height: 28px;
  @media ${({ theme }) => theme.device.mobile} {
    width: 71px;
    height: 73px;
  }
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
