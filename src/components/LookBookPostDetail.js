import styled from "styled-components";
import MyPostButtons from "./MyPostButtons";
import moment from "moment";
import InfoSection from "./InfoSection";
import { MainBtn } from "../elements/Buttons";
import { useNavigate } from "react-router-dom";

import PostRightBtn from "../components/PostRightBtn";

const LookBookPostDetail = ({ post, userId, postId }) => {
  window.onscroll = function () {
    document.getElementById("navbar").style.top =
      window.pageYOffset - 350 + "px";
  };
  const navigate = useNavigate();
  return (
    post && (
      <Wrap>
        <HeaderWrap>
          <TitleWrap onClick={() => navigate(`/userdetail/${post.userid}`)}>
            <Title weight={700}>{post.nickname}</Title>
            <Title weight={400}>님의 작업</Title>
          </TitleWrap>
          <Date>
            {post.createAt &&
              moment(
                post.createAt.split("T")[0] + "" + post.createAt.split("T")[1],
                "YYYY-MM-DD HH:mm:ss"
              )
                .add(9, "hours")
                .format()
                .slice(0, 10)}
          </Date>
          <MyButtonsWrap>
            {userId === post.userid ? (
              <MyPostButtons postType="lookbook" id={post.id} />
            ) : null}
          </MyButtonsWrap>
        </HeaderWrap>
        <BodyWrap>
          <LeftPostDiv />
          <CenterPostDiv>
            <Image
              first={true}
              alt="card"
              src={
                post.image[0] !== null
                  ? post.image[0]
                  : "http://openimage.interpark.com/goods_image_big/1/4/1/9/9090461419_l.jpg"
              }
            />
            <TextArea>{post.introduction}</TextArea>
            <Grid>
              {post.image.map((v, i) => {
                return i !== 0 ? <Image alt="card" src={v} /> : null;
              })}
            </Grid>
            <TextArea white={true}>{post.content}</TextArea>
          </CenterPostDiv>
          <RightPostDiv>
            <Navbar id="navbar">
              <InfoSection
                reform={false}
                region={post.addressCategory}
                category={post.category}
              />
              <ChattingBtn>채팅하기</ChattingBtn>
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
      </Wrap>
    )
  );
};

const Wrap = styled.div`
  margin-top: 60px;
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
  font-size: 45px;
  line-height: 60px;
  margin-left: ${(props) => (props.weight === 400 ? "10px" : 0)};
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
  margin-top: 90px;
`;

const LeftPostDiv = styled.div`
  width: 314px;
`;

const RightPostDiv = styled.div`
  width: 314px;
  position: relative;
`;

const Navbar = styled.div`
  position: absolute;
  top: -350px;
`;

const MyButtonsWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 16px;
  margin-top: 30px;
`;

const CenterPostDiv = styled.div`
  width: 700px;
  text-align: center;
`;

const Image = styled.img`
  width: 100%;
  object-fit: cover;
  margin: ${(props) => (props.first ? "0" : "50px 0")};
`;

const Grid = styled.div`
  display: grid;
  grid-gap: 40px;
  grid-template-columns: 1fr 1fr;
  margin: 20px 0;
`;

const TextArea = styled.div`
  text-align: ${(props) => (props.white ? "left" : "center")};
  border: none;
  width: 100%;
  height: auto;
  padding: ${(props) => (props.white ? "40px 0" : "40px 20px")};
  resize: none;
  overflow: hidden;
  font-weight: 400;
  font-size: 18px;
  line-height: 28px;
  background-color: ${(props) => (props.white ? "" : "#222")};
  color: ${(props) => (props.white ? "#222" : "#fff")};
`;

export default LookBookPostDetail;
