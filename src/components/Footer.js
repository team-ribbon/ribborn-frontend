import React from "react";
import styled from "styled-components";
import { AiFillFacebook, AiOutlineInstagram } from "react-icons/ai";

const Footer = () => {
  return (
    <Wrap>
      <Grid>
        <LeftDiv>
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
        </LeftDiv>
        <MiddleDiv>
          <Title>이용안내</Title>
          <ContentDiv>
            <Content>이용약관</Content> <br />
            <SpanMargin />
            <Content>개인정보처리방침</Content>
          </ContentDiv>
        </MiddleDiv>
        <RightDiv>
          <Title>고객지원</Title>
          <ContentDiv>
            <Content>공지사항</Content> <br />
            <SpanMargin />
            <Content>서비스소개</Content> <br />
            <SpanMargin />
            <Content>FAQ</Content>
          </ContentDiv>
        </RightDiv>
      </Grid>
    </Wrap>
  );
};

const Wrap = styled.footer`
  height: 300px;
  background-color: ${({ theme }) => theme.colors.lighterGray};
`;

const Grid = styled.div`
  width: fit-content;
  margin-left: 40px;
  display: grid;
  grid-gap: 160px;
  grid-template-columns: 1fr 1fr 1fr;
`;

const LeftDiv = styled.div``;

const MiddleDiv = styled.div``;

const RightDiv = styled.div``;

const Title = styled.span`
  font-weight: 700;
  font-size: 27px;
  line-height: 36px;
`;

const ContentDiv = styled.div`
  margin: 30px 0 14px 0;
`;

const Content = styled.span`
  font-weight: 400;
  font-size: ${({ theme }) => theme.fontSizes.m};
  line-height: 24px;
  color: #afb0b3;
`;

const SpanMargin = styled.div`
  height: 16px;
`;

export default Footer;
