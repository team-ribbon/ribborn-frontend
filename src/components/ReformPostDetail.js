import React from "react";
import styled from "styled-components";
import MyPostButtons from "./MyPostButtons";
import TimeCalculator from "../shared/TimeCalculator";
import InfoSection from "./InfoSection";
import { useNavigate } from "react-router-dom";
import { MainBtn } from "../elements/Buttons";

const ReformPostDetail = ({ post, userId, userType }) => {
  const scrollEvent = () => {
    document.getElementById("navbar1").style.top = window.pageYOffset + "px";
    document.getElementById("navbar2").style.top = window.pageYOffset + "px";
  };
  React.useEffect(() => {
    window.addEventListener("scroll", scrollEvent);
    return () => {
      window.removeEventListener("scroll", scrollEvent);
    };
  }, []);
  const navigate = useNavigate();
  let process = null;
  switch (post && post.process) {
    case undefined:
      break;
    case "before":
      process = "모집중";
      break;
    case "ing":
      process = "진행중";
      break;
    case "after":
      process = "완료";
      break;
  }
  return (
    post && (
      <Wrap>
        <HeaderWrap>
          <Community>견적</Community>
          <Title>{post.title}</Title>
          <IDDiv>
            <ID onClick={() => navigate(`/userdetail/${post.userid}`)}>
              @{post.nickname}
            </ID>
            <CircleDiv />
            <Time>{TimeCalculator(post.createAt)}</Time>
          </IDDiv>
          <PostProcess process={post.process}>{process}</PostProcess>
          <MobileInfoWrap>
            <InfoSection
              reform={true}
              region={post.region}
              category={post.category}
            />
            <MyButtonsWrap>
              {userId === post.userid ? (
                <MyPostButtons postType="reform" postId={post.id} />
              ) : null}
            </MyButtonsWrap>
            {+userType === 1 ? <ChattingBtn>채팅하기</ChattingBtn> : null}
          </MobileInfoWrap>
        </HeaderWrap>
        <BodyWrap>
          <LeftPostDiv>
            <Navbar id="navbar1">
              <InfoSection
                reform={true}
                region={post.region}
                category={post.category}
              />
              <MyButtonsWrap>
                {userId === post.userid ? (
                  <MyPostButtons postType="reform" postId={post.id} />
                ) : null}
              </MyButtonsWrap>
              {+userType === 1 ? <ChattingBtn>채팅하기</ChattingBtn> : null}
            </Navbar>
          </LeftPostDiv>
          <CenterPostDiv>
            <Image
              alt="card"
              src={
                post.image[0] !== null
                  ? post.image[0]
                  : "http://openimage.interpark.com/goods_image_big/1/4/1/9/9090461419_l.jpg"
              }
            />
            <MobileTextArea>{post.content}</MobileTextArea>
            {post.image.map((v, i) => {
              return i !== 0 ? <Image alt="card" src={v} /> : null;
            })}
          </CenterPostDiv>
          <RightPostDiv>
            <Navbar id="navbar2">
              <TextArea>{post.content}</TextArea>
            </Navbar>
          </RightPostDiv>
        </BodyWrap>
      </Wrap>
    )
  );
};

const Wrap = styled.div`
  width: 100%;
  max-width: ${({ theme }) => theme.width.maxWidth};
  margin: 60px auto 0 auto;
  @media ${({ theme }) => theme.device.mobile} {
    width: 1392px;
  }
`;

const HeaderWrap = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
`;

const Community = styled.p`
  font-weight: 400;
  font-size: ${({ theme }) => theme.fontSizes.l};
  line-height: 24px;
  color: #222222;
`;

const Title = styled.p`
  font-weight: 700;
  font-size: 27px;
  line-height: 36px;
  color: #222222;
`;

const IDDiv = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 16px;
  align-items: center;
  justify-content: center;
`;

const ID = styled.p`
  font-weight: 400;
  font-size: ${({ theme }) => theme.fontSizes.m};
  line-height: 18px;
  color: #afb0b3;
  :hover {
    cursor: pointer;
  }
`;

const CircleDiv = styled.div`
  background-color: #afb0b3;
  width: 6px;
  height: 6px;
  border-radius: 6px;
`;

const Time = styled.p`
  font-weight: 400;
  font-size: ${({ theme }) => theme.fontSizes.m};
  line-height: 18px;
  color: #afb0b3;
  margin-right: 34px;
`;

const PostProcess = styled.button`
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  height: 27px;
  width: 59px;
  background-color: ${(props) =>
    props.process === "before"
      ? "rgba(0, 174, 30, 0.43)"
      : props.process === "ing"
      ? "rgba(0, 64, 193, 0.43)"
      : "rgba(255, 140, 40, 0.43)"};
  border: none;
  border-radius: 8px;
  margin: 16px 30px auto 0px;
  float: left;
`;

const BodyWrap = styled.div`
  @media ${({ theme }) => theme.device.mobile} {
    display: grid;
    grid-template-columns: 346px 700px 346px;
  }
`;

const LeftPostDiv = styled.div`
  display: none;
  @media ${({ theme }) => theme.device.mobile} {
    display: initial;
    position: relative;
  }
`;

const Navbar = styled.div`
  position: absolute;
  top: 0;
`;

const MobileInfoWrap = styled.div`
  @media ${({ theme }) => theme.device.mobile} {
    display: none;
  }
`;

const MyButtonsWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 16px;
  margin: 30px 0;
`;

const ChattingBtn = styled(MainBtn)`
  margin: 0 0 0 16px;
  width: 314px;
`;

const CenterPostDiv = styled.div`
  width: 100%;
  max-width: 700px;
  text-align: center;
  margin: 0 auto;
  @media ${({ theme }) => theme.device.mobile} {
    width: 700px;
  }
`;

const RightPostDiv = styled.div`
  position: relative;
`;

const Image = styled.img`
  width: 100%;
  object-fit: cover;
  margin: 50px auto;
`;

const TextArea = styled.div`
  border: none;
  width: calc(100% - 16px);
  height: auto;
  resize: none;
  overflow: hidden;
  font-weight: 400;
  font-size: ${({ theme }) => theme.fontSizes.l};
  line-height: 28px;
  margin: 48px 38px auto 16px;
`;

const MobileTextArea = styled.div`
  width: calc(100% - 16px);
  font-weight: 400;
  font-size: ${({ theme }) => theme.fontSizes.l};
  line-height: 28px;
  @media ${({ theme }) => theme.device.mobile} {
    display: none;
  }
`;

export default ReformPostDetail;
