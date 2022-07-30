import React from "react";
import styled from "styled-components";
import MyPostButtons from "./MyPostButtons";
import moment from "moment";
import InfoSection from "./InfoSection";
import { MainBtn } from "../elements/Buttons";
import { useLocation, useNavigate } from "react-router-dom";
import { apis } from "../shared/api";

import PostRightBtn from "../components/PostRightBtn";

const LookBookPostDetail = ({ post, userId, postId, userType }) => {
  const scrollEvent = () => {
    if (post && userId === post.userid) {
      document.getElementById("navbar").style.top =
        window.pageYOffset - 350 + "px";
    } else {
      document.getElementById("navbar").style.top =
        window.pageYOffset - 250 + "px";
    }
  };
  React.useEffect(() => {
    window.addEventListener("scroll", scrollEvent);
    return () => {
      window.removeEventListener("scroll", scrollEvent);
    };
  }, []);
  const navigate = useNavigate();
  const location = useLocation();

  const onClickChat = async () => {
    if (post.userid === userId) {
      alert("본인에게 채팅을 요청할 수 없습니다.");
      return false;
    }
    if (!userId) {
      alert("로그인 후에 이용할 수 있습니다.");
      return false;
    }
    try {
      const response = await apis.addRoom(post.userid);
      navigate(`/chat/${response.data}`, {
        state: { backgroundLocation: location },
      });
    } catch (error) {}
  };

  return (
    post && (
      <Wrap>
        <HeaderWrap>
          <TitleWrap>
            <ClickTitle
              onClick={() => navigate(`/userdetail/${post.userid}`)}
              weight={700}
            >
              {post.nickname}
            </ClickTitle>
            <Title weight={400}>님의 작업</Title>
          </TitleWrap>
          <Date>{moment(post.createAt).format("YYYY.MM.DD")}</Date>
          {userId === post.userid && (
            <MyButtonsWrap>
              <MyPostButtons postType="lookbook" postId={post.id} />
            </MyButtonsWrap>
          )}
          <MobileInfoSection>
            <InfoSection
              reform={false}
              region={post.addressCategory}
              category={post.category}
            />
            {+userType === 0 && (
              <ChattingBtn onClick={onClickChat}>채팅하기</ChattingBtn>
            )}
          </MobileInfoSection>
        </HeaderWrap>
        <BodyWrap>
          <LeftPostDiv />
          <CenterPostDiv>
            <Image first alt="card" src={post.image[0]} />
            {post.introduction.length > 1 && (
              <TextArea>{post.introduction}</TextArea>
            )}
            <Grid>
              {post.image.map((v, i) => {
                return i !== 0 ? <Image alt="card" src={v} /> : null;
              })}
            </Grid>
            <TextArea white={true}>{post.content}</TextArea>
          </CenterPostDiv>
          <RightPostDiv>
            <Navbar id="navbar" myPost={post && userId === post.userid}>
              <InfoSection
                reform={false}
                region={post.addressCategory}
                category={post.category}
              />
              {+userType === 0 ? (
                <ChattingBtn onClick={onClickChat}>채팅하기</ChattingBtn>
              ) : null}
              <PostRightBtn
                noshare={false}
                id={postId}
                liked={post && post.liked}
                likeCount={post && post.likeCount}
                lookbook={true}
              />
            </Navbar>
          </RightPostDiv>
        </BodyWrap>
        <MobilePostRightBtnWrap>
          <PostRightBtn
            noshare={false}
            id={postId}
            liked={post && post.liked}
            likeCount={post && post.likeCount}
            lookbook={true}
          />
        </MobilePostRightBtnWrap>
      </Wrap>
    )
  );
};

const Wrap = styled.div`
  margin: 60px auto 0 auto;
  width: 100%;
  @media ${({ theme }) => theme.device.mobile} {
    width: 1360px;
  }
`;
const HeaderWrap = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
`;
const TitleWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;
const Title = styled.p`
  font-weight: ${(props) => props.weight};
  font-size: ${({ theme }) => theme.fontSizes.l};
  line-height: 30px;
  margin-left: ${(props) => (props.weight === 400 ? "10px" : 0)};
  @media ${({ theme }) => theme.device.mobile} {
    font-size: 45px;
    line-height: 60px;
  }
`;
const ClickTitle = styled(Title)`
  :hover {
    cursor: pointer;
  }
`;
const Date = styled.span`
  font-weight: 400;
  font-size: ${({ theme }) => theme.fontSizes.l};
  line-height: 24px;
  margin-top: 16px;
`;
const ChattingBtn = styled(MainBtn)`
  margin: 30px 0 0 16px;
  width: 314px;
`;
const BodyWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 40px;
  @media ${({ theme }) => theme.device.mobile} {
    margin-top: 90px;
  }
`;
const LeftPostDiv = styled.div`
  display: none;
  @media ${({ theme }) => theme.device.mobile} {
    width: 330px;
    display: initial;
  }
`;
const RightPostDiv = styled.div`
  display: none;
  @media ${({ theme }) => theme.device.mobile} {
    display: inherit;
    width: 330px;
    position: relative;
  }
`;
const Navbar = styled.div`
  position: absolute;
  margin-top: 10px;
  top: ${(props) => (props.myPost ? "-350px" : "-250px")};
`;
const MobilePostRightBtnWrap = styled.div`
  position: fixed;
  right: 16px;
  bottom: 30%;
  @media ${({ theme }) => theme.device.mobile} {
    display: none;
  }
`;
const MyButtonsWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 16px;
  margin-top: 30px;
`;
const MobileInfoSection = styled.div`
  @media ${({ theme }) => theme.device.mobile} {
    display: none;
  }
`;
const CenterPostDiv = styled.div`
  width: 700px;
  text-align: center;
`;
const Image = styled.img`
  width: 100%;
  object-fit: cover;
  margin: ${(props) => (props.first ? "0 0 -4px 0 " : "50px 0")};
`;
const Grid = styled.div`
  display: grid;
  grid-gap: 40px;
  grid-template-columns: 1fr 1fr;
  margin: 20px 0;
`;
const TextArea = styled.div`
  text-align: left;
  border: none;
  width: 100%;
  height: auto;
  padding: ${(props) => (props.white ? "40px 16px" : "40px 20px")};
  resize: none;
  overflow: hidden;
  font-weight: 400;
  font-size: ${({ theme }) => theme.fontSizes.l};
  line-height: 28px;
  background-color: ${(props) => (props.white ? "" : "#222")};
  color: ${(props) => (props.white ? "#222" : "#fff")};
  @media all and (min-width: 850px) {
    padding: ${(props) => (props.white ? "40px 0" : "40px 20px")};
  }
`;

export default LookBookPostDetail;
