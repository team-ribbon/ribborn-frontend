import React from "react";
import styled from "styled-components";
import { AiFillFacebook, AiOutlineInstagram } from "react-icons/ai";
import { useMatch } from "react-router-dom";

const Footer = () => {
  const isLookbook = useMatch("lookbookdetail/:postId");
  const isReform = useMatch("reformdetail/:postId");
  const isWhite = useMatch("/reform");

  return (
    <Wrap isLookbook={isLookbook} isReform={isReform} isWhite={isWhite}>
      <Grid>
        <BoxDiv>
          <Title>RIBBORN</Title>
          <ContentDiv>
            <Content>리본 주식회사 대표 이땡땡</Content> <br />
            <Content>사업자등록번호:123-45-67891</Content> <br />
            <Content>통신판매업신고번호:제2022-서울서초-0000호</Content> <br />
            <Content>주소: 서울시 강남구 도산대로, 7층</Content> <br />
            <Content>ribborn@ribborn.co.kr</Content> <br />
          </ContentDiv>
          <AiFillFacebook size="32" color="rgba(61, 62, 78)" />
          <AiOutlineInstagram
            style={{ marginLeft: "8px" }}
            size="32"
            color="rgba(61, 62, 78)"
          />
        </BoxDiv>
        <BoxDiv>
          <Title>이용안내</Title>
          <ContentDiv>
            <Content>이용약관</Content> <br />
            <SpanMargin />
            <Content>개인정보처리방침</Content>
          </ContentDiv>
        </BoxDiv>
        <BoxDiv>
          <Title>고객지원</Title>
          <ContentDiv>
            <Content>공지사항</Content> <br />
            <SpanMargin />
            <Content>서비스소개</Content> <br />
            <SpanMargin />
            <Content>FAQ</Content>
          </ContentDiv>
        </BoxDiv>
      </Grid>
      <MobileGrid>
        <MobileBoxDiv>
          <MobileTitle>이용안내</MobileTitle>
          <ContentDiv>
            <MobileContent>이용약관</MobileContent> <br />
            <MobileSpanMargin />
            <MobileContent>개인정보처리방침</MobileContent>
          </ContentDiv>
        </MobileBoxDiv>
        <MobileBoxDiv>
          <MobileTitle>고객지원</MobileTitle>
          <ContentDiv>
            <MobileContent>공지사항</MobileContent> <br />
            <MobileSpanMargin />
            <MobileContent>서비스소개</MobileContent> <br />
            <MobileSpanMargin />
            <MobileContent>FAQ</MobileContent>
          </ContentDiv>
        </MobileBoxDiv>
      </MobileGrid>
      <MobileBottomBoxDiv>
        <MobileBottomSpanDiv>
          <MobileContent>리본 주식회사 대표 이땡땡</MobileContent>
          <MobileSpanMargin />
          <MobileContent>사업자등록번호:123-45-67891</MobileContent>
          <MobileSpanMargin />
          <MobileContent>
            통신판매업신고번호:제2022-서울서초-0000호
          </MobileContent>
          <MobileSpanMargin />
          <MobileContent>주소: 서울시 강남구 도산대로, 7층</MobileContent>
          <MobileSpanMargin />
          <MobileContent>ribborn@ribborn.co.kr</MobileContent>
        </MobileBottomSpanDiv>
        <MobileIconDiv>
          <AiFillFacebook size="28" color="rgba(61, 62, 78)" />
          <AiOutlineInstagram
            style={{ marginLeft: "8px" }}
            size="28"
            color="rgba(61, 62, 78)"
          />
        </MobileIconDiv>
        <MobileCompanyName>RIBBORN</MobileCompanyName>
      </MobileBottomBoxDiv>
    </Wrap>
  );
};

const Wrap = styled.footer`
  width: 100%;
  height: 560px;
  margin-top: 60px;
  z-index: 10;
  background-color: ${({ theme, isWhite }) =>
    isWhite ? "#fff" : theme.colors.lighterGray};
  @media ${({ theme }) => theme.device.mobile} {
    height: 401px;
    min-width: ${(props) =>
      props.isLookbook ? "1360px" : props.isReform ? "1392px" : "100%"};
  }
`;

const Grid = styled.div`
  width: fit-content;
  margin-left: 40px;
  display: none;
  grid-gap: 160px;
  grid-template-columns: 1fr 1fr 1fr;
  @media ${({ theme }) => theme.device.mobile} {
    display: grid;
  }
`;

const MobileGrid = styled.div`
  width: fit-content;
  margin-left: 16px;
  display: grid;
  grid-gap: 60px;
  grid-template-columns: 1fr 1fr;
  @media ${({ theme }) => theme.device.mobile} {
    display: none;
  }
`;

const BoxDiv = styled.div`
  margin-top: 86px;
`;

const MobileBoxDiv = styled.div`
  margin-top: 25px;
`;

const Title = styled.span`
  font-weight: 700;
  font-size: 27px;
  line-height: 36px;
`;

const ContentDiv = styled.div`
  @media ${({ theme }) => theme.device.mobile} {
    margin: 16px 0 14px 0;
  }
  margin: 16px 0 0 0;
`;

const Content = styled.span`
  font-weight: 400;
  font-size: ${({ theme }) => theme.fontSizes.m};
  line-height: 24px;
  color: #afb0b3;
`;

const MobileTitle = styled.span`
  font-weight: 700;
  font-size: ${({ theme }) => theme.fontSizes.s};
  line-height: 14px;
`;

const MobileContent = styled.span`
  font-weight: 400;
  font-size: ${({ theme }) => theme.fontSizes.s};
  line-height: 14px;
  color: #afb0b3;
`;

const MobileBottomBoxDiv = styled.div`
  margin: 60px 0 0 16px;
  @media ${({ theme }) => theme.device.mobile} {
    display: none;
  }
`;

const MobileBottomSpanDiv = styled.div`
  margin-bottom: 21px;
`;

const MobileIconDiv = styled.div`
  margin-bottom: 21px;
`;

const MobileCompanyName = styled.span`
  font-weight: 700;
  font-size: 15px;
  line-height: 19px;
`;

const SpanMargin = styled.div`
  height: 16px;
`;

const MobileSpanMargin = styled.div`
  height: 8px;
`;

export default Footer;
