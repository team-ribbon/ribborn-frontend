import styled from "styled-components";
import MyPostButtons from "./MyPostButtons";
import TimeCalculator from "../shared/TimeCalculator";
import InfoSection from "./InfoSection";
import { useNavigate } from "react-router-dom";

const ReformPostDetail = ({ post, userId }) => {
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
        </HeaderWrap>
        <BodyWrap>
          <LeftPostDiv>
            <InfoSection
              reform={true}
              region={post.region}
              category={post.category}
            />
            <MyButtonsWrap>
              {userId === post.userid ? (
                <MyPostButtons postType="lookbook" id={post.id} />
              ) : null}
            </MyButtonsWrap>
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
            {post.image.map((v, i) => {
              return i !== 0 ? <Image alt="card" src={v} /> : null;
            })}
          </CenterPostDiv>
          <RightPostDiv>
            <TextArea>{post.content}</TextArea>
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

const Community = styled.p`
  font-weight: 400;
  font-size: 18px;
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
  font-size: 14px;
  line-height: 18px;
  color: #afb0b3;
`;

const CircleDiv = styled.div`
  background-color: #afb0b3;
  width: 6px;
  height: 6px;
  border-radius: 6px;
`;

const Time = styled.p`
  font-weight: 400;
  font-size: 14px;
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
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const LeftPostDiv = styled.div``;

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

const RightPostDiv = styled.div`
  max-width: 495px;
`;

const Image = styled.img`
  width: 100%;
  object-fit: cover;
  margin: 50px auto;
`;

const TextArea = styled.div`
  border: none;
  width: 100%;
  height: auto;
  resize: none;
  overflow: hidden;
  font-weight: 400;
  font-size: 18px;
  line-height: 28px;
  margin: 48px 38px auto 16px;
`;

export default ReformPostDetail;
