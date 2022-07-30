import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { apis } from "../shared/api";
import MyPostButtons from "./MyPostButtons";
import TimeCalculator from "../shared/TimeCalculator";
import InfoSection from "./InfoSection";
import { useNavigate, useLocation } from "react-router-dom";
import { MainBtn } from "../elements/Buttons";
import { processChangeDB } from "../redux/modules/post";

const ReformPostDetail = ({ post, userId, userType }) => {
  const scrollEvent = () => {
    document.getElementById("navbar1").style.top = window.pageYOffset + "px";
    document.getElementById("navbar2").style.top =
      window.pageYOffset + 18 + "px";
  };
  React.useEffect(() => {
    window.addEventListener("scroll", scrollEvent);
    return () => {
      window.removeEventListener("scroll", scrollEvent);
    };
  }, []);

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  let process = null;
  switch (post && post.process) {
    case "before":
      process = "모집중";
      break;
    case "ing":
      process = "진행중";
      break;
    case "after":
      process = "완료";
      break;
    default:
      break;
  }

  const onClickChat = async () => {
    try {
      const response = await apis.addRoom(post.userid);
      navigate(`/chat/${response.data}`, {
        state: { backgroundLocation: location },
      });
    } catch (error) {}
  };

  const onClickProcessChange = (process) => {
    dispatch(processChangeDB(post.id, process));
  };

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
            {userId === post.userid && post.process === "before" && (
              <ProcessButton
                onClick={() => {
                  onClickProcessChange("ing");
                }}
              >
                진행중으로 변경
              </ProcessButton>
            )}
            {userId === post.userid && post.process === "ing" && (
              <ProcessButton
                onClick={() => {
                  onClickProcessChange("after");
                }}
              >
                완료로 변경
              </ProcessButton>
            )}
            <MyButtonsWrap>
              {userId === post.userid && (
                <MyPostButtons postType="reform" postId={post.id} />
              )}
            </MyButtonsWrap>
            {+userType === 1 && (
              <ChattingBtn onClick={onClickChat}>채팅하기</ChattingBtn>
            )}
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
              {+userType === 1 && (
                <ChattingBtn onClick={onClickChat}>채팅하기</ChattingBtn>
              )}
            </Navbar>
          </LeftPostDiv>
          <CenterPostDiv>
            <FirstImage
              alt="card"
              src={post?.image[0] || "/images/textLogo.png"}
              hasImage={post?.image[0]}
            />
            <MobileTextArea>{post.content}</MobileTextArea>
            {post.image.map((v, i) => {
              return i !== 0 ? <Image alt="card" src={v} /> : null;
            })}
          </CenterPostDiv>
          <RightPostDiv>
            <RightNavbar id="navbar2">
              {userId === post.userid && post.process === "before" && (
                <ProcessButton
                  onClick={() => {
                    onClickProcessChange("ing");
                  }}
                >
                  진행중으로 변경
                </ProcessButton>
              )}
              {userId === post.userid && post.process === "ing" && (
                <ProcessButton
                  onClick={() => {
                    onClickProcessChange("after");
                  }}
                >
                  완료로 변경
                </ProcessButton>
              )}
              <TextArea>{post.content}</TextArea>
            </RightNavbar>
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
  display: grid;
  grid-template-columns: 1fr 6px 1fr;
  grid-gap: 16px;
  margin-top: 16px;
  align-items: center;
  justify-content: center;
`;

const ID = styled.p`
  font-weight: 400;
  font-size: ${({ theme }) => theme.fontSizes.m};
  line-height: 18px;
  color: #afb0b3;
  text-align: right;
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
  text-align: left;
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
  margin: 16px auto auto auto;
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
  top: 0px;
`;

const RightNavbar = styled.div`
  position: absolute;
  top: 18px;
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

const FirstImage = styled.img`
  width: 100%;
  object-fit: cover;
  margin: 50px auto 15px auto;
  opacity: ${({ hasImage }) => !hasImage && "0.15"};
`;

const Image = styled.img`
  width: 100%;
  object-fit: cover;
  margin: 15px auto;
  opacity: ${({ hasImage }) => !hasImage && "0.15"};
`;

const ProcessButton = styled(MainBtn)`
  margin: 30px auto 0 auto;
  @media ${({ theme }) => theme.device.mobile} {
    margin: 30px 38px auto 16px;
  }
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
  margin: 30px 38px auto 16px;
`;

const MobileTextArea = styled.div`
  width: calc(100% - 32px);
  font-weight: 400;
  font-size: ${({ theme }) => theme.fontSizes.l};
  line-height: 28px;
  text-align: left;
  margin: 0 auto;
  @media ${({ theme }) => theme.device.mobile} {
    display: none;
  }
`;

export default ReformPostDetail;
