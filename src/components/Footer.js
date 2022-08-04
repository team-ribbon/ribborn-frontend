import React, { useState } from "react";
import styled from "styled-components";
import { AiFillFacebook, AiOutlineInstagram } from "react-icons/ai";
import { Link, useMatch, useNavigate } from "react-router-dom";
import RuleModal from "./RuleModal";
import RuleText from "../shared/RuleText";
import InfoText from "../shared/InfoText";

const Footer = () => {
  const navigate = useNavigate();
  const isLookbook = useMatch("lookbookdetail/:postId");
  const isReform = useMatch("reformdetail/:postId");
  const isWhite = useMatch("/reform");

  const [ruleModal, setRuleModal] = useState(false);
  const [infoModal, setInfoModal] = useState(false);

  return (
    <>
      <ModalWrap>
        {ruleModal && (
          <RuleModal
            isModalOn={ruleModal}
            setIsModalOn={setRuleModal}
            title="이용약관"
            content={RuleText}
          />
        )}
        {infoModal && (
          <RuleModal
            info
            isModalOn={infoModal}
            setIsModalOn={setInfoModal}
            title="개인정보처리방침"
            content={InfoText}
          />
        )}
      </ModalWrap>
      <Wrap
        id="footer"
        isLookbook={isLookbook}
        isReform={isReform}
        isWhite={isWhite}
      >
        <Grid>
          <BoxDiv>
            <Title>
              <Logo>RIBBORN</Logo>
            </Title>
            <ContentDiv>
              <Content>FE: 김현빈, 차혜준</Content> <br />
              <Content>BE: 박성규, 박성렬, 이정우</Content> <br />
              <Content>DESIGN: 채리아</Content> <br />
              <ClickContent
                onClick={() => {
                  window.open("https://github.com/team-ribbon", "_blank");
                }}
              >
                https://github.com/team-ribbon
              </ClickContent>
              <br />
              <Content>ribborn.kr@gmail.com</Content>
              <br />
            </ContentDiv>
            <AiFillFacebook
              onClick={() => {
                window.open("https://www.facebook.com/ribborn.kr", "_blank");
              }}
              size="32"
              color="rgba(61, 62, 78)"
              cursor="pointer"
            />
            <AiOutlineInstagram
              onClick={() => {
                window.open("https://www.instagram.com/ribborn.kr", "_blank");
              }}
              style={{ marginLeft: "8px" }}
              size="32"
              color="rgba(61, 62, 78)"
              cursor="pointer"
            />
          </BoxDiv>
          <BoxDiv>
            <Title>이용안내</Title>
            <ContentDiv>
              <ClickContent
                onClick={() => {
                  setRuleModal(true);
                }}
              >
                이용약관
              </ClickContent>{" "}
              <br />
              <SpanMargin />
              <ClickContent
                onClick={() => {
                  setInfoModal(true);
                }}
              >
                개인정보처리방침
              </ClickContent>
            </ContentDiv>
          </BoxDiv>
          <BoxDiv>
            <Title>고객지원</Title>
            <ContentDiv>
              {/* <ClickContent>공지사항</ClickContent> <br />
              <SpanMargin />
              <ClickContent>서비스소개</ClickContent> <br />
              <SpanMargin /> */}
              <Link to="/faq">
                <ClickContent>FAQ</ClickContent>
              </Link>
            </ContentDiv>
          </BoxDiv>
        </Grid>
        <MobileGrid>
          <MobileBoxDiv>
            <MobileTitle>이용안내</MobileTitle>
            <ContentDiv>
              <MobileContent>이용약관</MobileContent> <br />
              <MobileSpanMargin />
              <MobileContent>개인정보 수집 및 이용 안내</MobileContent>
            </ContentDiv>
          </MobileBoxDiv>
          <MobileBoxDiv>
            <MobileTitle>고객지원</MobileTitle>
            <ContentDiv>
              <MobileContent>공지사항</MobileContent> <br />
              <MobileSpanMargin />
              <MobileContent>서비스소개</MobileContent> <br />
              <MobileSpanMargin />
              <Link to="/faq">
                <MobileContent>FAQ</MobileContent>
              </Link>
            </ContentDiv>
          </MobileBoxDiv>
        </MobileGrid>
        <MobileBottomBoxDiv>
          <MobileBottomSpanDiv>
            <MobileContent>FE: 김현빈, 차혜준</MobileContent>
            <MobileSpanMargin />
            <MobileContent>BE: 박성규, 박성렬, 이정우</MobileContent>
            <MobileSpanMargin />
            <MobileContent>DESIGN: 채리아</MobileContent>
            <MobileSpanMargin />
            <MobileContent
              onClick={() => {
                window.open("https://github.com/team-ribbon", "_blank");
              }}
            >
              https://github.com/team-ribbon
            </MobileContent>
            <MobileSpanMargin />
            <MobileContent>ribborn.kr@gmail.com</MobileContent>
          </MobileBottomSpanDiv>
          <MobileIconDiv>
            <AiFillFacebook
              onClick={() => {
                window.open("https://www.facebook.com/ribborn.kr", "_blank");
              }}
              size="28"
              color="rgba(61, 62, 78)"
              cursor="pointer"
            />
            <AiOutlineInstagram
              onClick={() => {
                window.open("https://www.instagram.com/ribborn.kr", "_blank");
              }}
              style={{ marginLeft: "8px" }}
              size="28"
              color="rgba(61, 62, 78)"
              cursor="pointer"
            />
          </MobileIconDiv>
          <MobileCompanyName>
            <Logo>RIBBORN</Logo>
          </MobileCompanyName>
        </MobileBottomBoxDiv>
      </Wrap>
    </>
  );
};

const ModalWrap = styled.div`
  position: relative;
`;

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
const Logo = styled.span`
  font-family: "quicksand", sans-serif !important;
  font-style: normal;
  font-weight: 500;
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

const ClickContent = styled(Content)`
  cursor: pointer;
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
