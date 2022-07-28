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
      <Link to={contents.banner[0].url}>
        <BannerWrap>
          <Banner1 src={contents && contents.banner[0].image} type="A" />
        </BannerWrap>
      </Link>
      <MainNavWrap>
        <Nav>
          <Link to="/lookbook">
            <LinkDiv>
              <TrendButton>
                <NewTrend>NEW TREND</NewTrend>
              </TrendButton>
              <MobileTrendButton>
                <NewTrend>NEW</NewTrend>
              </MobileTrendButton>
              <DesktopNavSpan>뉴 트렌드 리폼 🎵</DesktopNavSpan>
              <MobileNavSpan>뉴 트렌드 리폼</MobileNavSpan>
            </LinkDiv>
          </Link>
          <Link to="/review/clothes">
            <LinkDiv>
              <NavButton>
                <ClothesImg src="./images/clothes.png" />
              </NavButton>
              <NavSpan>옷 리뷰</NavSpan>
            </LinkDiv>
          </Link>
          <Link to="/review/furniture">
            <LinkDiv>
              <NavButton>
                <FurnituresImg src="./images/furnitures.png" />
              </NavButton>
              <NavSpan>가구 리뷰</NavSpan>
            </LinkDiv>
          </Link>
          <Link to="/review/shoes">
            <LinkDiv>
              <NavButton>
                <ShoesImg src="./images/shoes.png" />
              </NavButton>
              <NavSpan>신발 리뷰</NavSpan>
            </LinkDiv>
          </Link>
          <Link to="/review/bags">
            <LinkDiv>
              <NavButton>
                <BagsImg src="./images/bags.png" />
              </NavButton>
              <NavSpan>가방 리뷰</NavSpan>
            </LinkDiv>
          </Link>
          <Link to="/review/goods">
            <LinkDiv>
              <NavButton>
                <GoodsImg src="./images/goods.png" />
              </NavButton>
              <NavSpan>기타 리뷰</NavSpan>
            </LinkDiv>
          </Link>
          <Link to="/qna">
            <LinkDiv>
              <NavButton>
                <DesktopCommunity>COMMUNITY</DesktopCommunity>
                <MobileCommunity>COMM- UNITY</MobileCommunity>
              </NavButton>
              <NavSpan>질문과 답변</NavSpan>
            </LinkDiv>
          </Link>
          <Link to="/">
            <LinkDiv>
              <NavButton>
                <Community>Service Guide</Community>
              </NavButton>
              <DesktopNavSpan>리본 이용 가이드</DesktopNavSpan>
              <MobileNavSpan>이용 가이드</MobileNavSpan>
            </LinkDiv>
          </Link>
        </Nav>
      </MainNavWrap>
      <CO2>
        <CO2SVGWrap>
          <CO2SVGDiv>
            <svg
              width="100%"
              viewBox="0 0 1118 347"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M136.867 -63C89.7714 -16.848 16.9643 82.8168 102.5 112.261C209.42 149.065 194.145 184.117 148.323 252.469C102.5 320.821 -17.7848 439.998 83.407 497.834C184.599 555.67 205.601 420.719 245.696 373.399C285.791 326.079 331.613 312.058 438.533 336.594C545.453 361.131 549.271 222.675 518.723 187.623C488.174 152.571 362.162 99.9924 449.989 7.10425C537.815 -85.7839 610.368 99.9924 646.644 112.261C682.921 124.529 711.56 143.808 871.939 40.4038C1032.32 -63 1085.78 35.146 1070.5 78.9611C1055.23 122.776 936.855 229.685 881.486 266.49C826.117 303.295 881.486 408.451 837.572 464.534C793.659 520.618 665.737 534.639 646.644 464.534"
                stroke="url(#paint0_linear_884_3510)"
                stroke-opacity="0.66"
                stroke-width="88"
                stroke-linecap="round"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_884_3510"
                  x1="44"
                  y1="224.5"
                  x2="1073"
                  y2="224.5"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#17029A" />
                  <stop offset="1" stop-color="#16A000" />
                </linearGradient>
              </defs>
            </svg>
          </CO2SVGDiv>
        </CO2SVGWrap>
        <CO2SpanLeftDiv>
          <CO2Span>누적 {contents.co2Count}건의 리폼이</CO2Span>
          <br />
          <CO2LightBoldSpan>RiBBORN</CO2LightBoldSpan>
          <CO2Span>으로 인해</CO2Span>
        </CO2SpanLeftDiv>
        <br />
        <CO2SpanRightDiv>
          {+contents.co2Reduce >= 1000 ? (
            <CO2BoldSpan>
              탄소 {(+contents.co2Reduce / 1000).toFixed(1)}t
            </CO2BoldSpan>
          ) : (
            <CO2BoldSpan>탄소 {contents.co2Reduce}kg</CO2BoldSpan>
          )}
          <CO2Span>을 줄였습니다.</CO2Span>
        </CO2SpanRightDiv>
      </CO2>
      <MainWrap>
        <MainSection
          type="A"
          title="금손 장인✌🏻"
          url="/review"
          postList={contents.reviewList}
        />
      </MainWrap>
      <DesignSection postList={contents.lookbookList} />
      <BannerWrap
        onClick={() => {
          window.open(contents.banner[1].url, "_blank");
        }}
      >
        <Banner2 src={contents.banner[1].image} type="B" />
      </BannerWrap>
      <MainWrap>
        <MainSection
          type="C"
          title="오늘의 견적⚡️"
          url="/reform"
          postList={contents.reformList}
        />
      </MainWrap>
    </main>
  );
};

const MainWrap = styled.div`
  max-width: ${({ theme }) => theme.width.maxWidth};
  padding: 50px 16px 0 16px;
  margin: 0 auto 0 auto;
  font-weight: 400;
  font-size: ${({ theme }) => theme.fontSizes.m};
  line-height: 18px;
  @media ${({ theme }) => theme.device.mobile} {
    padding: 50px 40px 0 40px;
  }
`;
const MainNavWrap = styled.div`
  max-width: ${({ theme }) => theme.width.maxWidth};
  padding: 50px 40px 0 40px;
  margin: 0 auto 0 auto;
  font-weight: 400;
  font-size: ${({ theme }) => theme.fontSizes.m};
  line-height: 18px;
  @media screen and (max-width: ${({ theme }) => theme.deviceSizes.mobile}) {
    padding: 50px 0 0 0;
  }
`;
const BannerWrap = styled.div`
  max-width: ${({ theme }) => theme.width.maxWidth};
  margin: 0 auto 0 auto;
  background-color: #d9d9d9;
  cursor: pointer;
  @media ${({ theme }) => theme.device.mobile} {
    margin: 10px auto 0 auto;
  }
`;
const Banner1 = styled.img`
  width: 100%;
  height: 50vw;
  object-fit: cover;
  @media ${({ theme }) => theme.device.mobile} {
    height: 480px;
    margin: 10px auto 0 auto;
  }
`;
const Banner2 = styled.img`
  width: calc(100% - 32px);
  margin-left: 16px;
  object-fit: contain;
  @media ${({ theme }) => theme.device.mobile} {
    height: 350px;
    width: 100%;
    margin-left: 0;
  }
`;

const Nav = styled.nav`
  display: grid;
  grid-column-gap: 0;
  grid-row-gap: 16px;
  text-align: center;
  margin-bottom: 50px;
  justify-content: center;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  @media all and (max-width: 300px) {
    grid-template-columns: 1fr 1fr;
  }
  @media all and (min-width: 768px) and (max-width: 900px) {
    grid-template-columns: 140px 140px 140px 140px;
    grid-column-gap: 16px;
  }
  @media all and (min-width: 900px) and (max-width: 1312px) {
    grid-template-columns: 180px 180px 180px 180px;
    grid-column-gap: 16px;
  }
  @media all and (min-width: 1312px) {
    grid-template-columns: repeat(8, minmax(140px, 1fr));
    grid-column-gap: 16px;
  }
`;

const LinkDiv = styled.div`
  justify-content: center;
  text-align: center;
  transition: all 0.1s ease-in-out;
  &:hover {
    opacity: 0.65;
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
  margin: 0 auto 24px auto;
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
  margin: 0 auto 24px auto;
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
  height: 24vw;
  max-height: 347px;
  background: #d9d9d9;
  position: relative;
  font-size: ${({ theme }) => theme.fontSizes.xl};
`;

const CO2SVGWrap = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
`;

const CO2SVGDiv = styled.div`
  width: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const CO2SpanLeftDiv = styled.div`
  position: absolute;
  top: 14%;
  left: 3%;
  width: fit-content;
`;

const CO2Span = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.s};
  line-height: 129%;
  font-weight: 400;
  @media all and (min-width: 300px) {
    font-size: ${({ theme }) => theme.fontSizes.m};
  }
  @media all and (min-width: 400px) {
    font-size: ${({ theme }) => theme.fontSizes.l};
  }
  @media all and (min-width: 550px) {
    font-size: 25px;
  }
  @media all and (min-width: 650px) {
    font-size: ${({ theme }) => theme.fontSizes.xl};
  }
`;

const CO2LightBoldSpan = styled(CO2Span)`
  font-weight: 600;
`;

const CO2BoldSpan = styled(CO2Span)`
  font-weight: 700;
`;

const CO2SpanRightDiv = styled.span`
  position: absolute;
  right: 3.5%;
  bottom: 8%;
  width: fit-content;
`;

export default Main;
