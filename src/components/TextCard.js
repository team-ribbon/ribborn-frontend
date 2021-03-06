import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import Categories from "../shared/Categories";
import Regions from "../shared/Regions";
import { CommentSVG, HeartSVG } from "../elements/SVG";

const TextCard = ({ postObj, noWriter, reform, inViewRef }) => {
  const navigate = useNavigate();

  let process = null;
  switch (postObj.process) {
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

  return (
    <PostDiv
      key={"post" + postObj.postId}
      onClick={() => {
        reform
          ? navigate(`/reformdetail/${postObj.id}`)
          : navigate(`/qnadetail/${postObj.id}`);
      }}
      ref={inViewRef}
    >
      <TextDiv>
        <TitleContentWrap>
          <TitleDiv>
            {reform ? (
              <PostProcess process={postObj.process}>{process}</PostProcess>
            ) : null}
            <Title>{postObj.title}</Title>
          </TitleDiv>
          <Content>{postObj.content}</Content>
        </TitleContentWrap>
        <PostFooter>
          {noWriter ? null : <PostUserId>@{postObj.nickname}</PostUserId>}
          {reform ? null : (
            <RowFlexDiv>
              <LikeDiv>
                <HeartSVG />
                <Like>{postObj.likeCount}</Like>
              </LikeDiv>
              <LikeDiv>
                <CommentSVG />
                <Comment>{postObj.commentCount}</Comment>
              </LikeDiv>
            </RowFlexDiv>
          )}
          <RowFlexDiv>
            {reform
              ? Categories.map((w) => {
                  return w.value === postObj.category ? (
                    <PostCategory key={"postCategory" + w.value}>
                      {w.text}
                    </PostCategory>
                  ) : null;
                })
              : null}
            {reform
              ? Regions.map((w) => {
                  return w.value === postObj.region ? (
                    <PostCategory key={"postRegion" + w.value}>
                      {w.text}
                    </PostCategory>
                  ) : null;
                })
              : null}
            {reform
              ? null
              : Categories.map((w) => {
                  return w.value === postObj.category ? (
                    <PostCategory key={"postCategory" + w.value}>
                      {w.text}
                    </PostCategory>
                  ) : null;
                })}
          </RowFlexDiv>
        </PostFooter>
      </TextDiv>
      <PictureDiv>
        <Picture
          hasImage={postObj?.image}
          src={postObj?.image || "/images/textLogo.png"}
        />
      </PictureDiv>
    </PostDiv>
  );
};

const PostDiv = styled.div`
  width: 100%;
  border-bottom: 1px solid #ccc;
  margin-bottom: 20px;
  height: fit-content;
  display: flex;
  flex-direction: row;
  cursor: pointer;
  @media all and (min-width: 650px) {
    height: 256px;
  }
  &:hover {
    img {
      transform: scale(1.05);
    }
  }
  animation: 0.5s ease-in-out loadEffect;
  @keyframes loadEffect {
    0% {
      opacity: 0;
      transform: translateY(30px);
    }
    100% {
      opacity: 1;
      transform: translateY(0px);
    }
  }
`;

const TextDiv = styled.div`
  width: 70%;
  @media all and (min-width: 650px) {
    width: 80%;
  }
`;

const TitleContentWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

const TitleDiv = styled.div`
  display: flex;
  flex-direction: column;
  @media ${({ theme }) => theme.device.mobile} {
    flex-direction: row;
  }
`;

const Title = styled.p`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  font-size: ${({ theme }) => theme.fontSizes.m};
  font-weight: 700;
  margin: 20px 5px 10px 0;
  float: left;
  @media ${({ theme }) => theme.device.mobile} {
    font-size: ${({ theme }) => theme.fontSizes.l};
  }
`;

const PostProcess = styled.button`
  font-weight: 400;
  font-size: ${({ theme }) => theme.fontSizes.s};
  line-height: 14px;
  height: 27px;
  width: 59px;
  background-color: ${({ process }) =>
    process === "after"
      ? "rgba(50, 47, 90, 0.43)"
      : process === "ing"
      ? "rgba(255, 140, 40, 0.43)"
      : "rgba(0, 174, 30, 0.43)"};
  border: none;
  border-radius: 8px;
  margin: 16px 30px auto 0px;
  float: left;
`;

const Content = styled.p`
  display: none;
  font-weight: 400;
  font-size: ${({ theme }) => theme.fontSizes.m};
  line-height: 28px;
  overflow: hidden;
  height: 80px;
  width: 80%;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  color: #222222;
  @media ${({ theme }) => theme.device.mobile} {
    display: -webkit-box;
  }
`;

const PostFooter = styled.div`
  margin: 0px auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
  @media ${({ theme }) => theme.device.mobile} {
    margin: 20px auto;
    flex-direction: row;
    align-items: center;
    gap: 0px;
  }
`;

const RowFlexDiv = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 17px;
  @media ${({ theme }) => theme.device.mobile} {
    margin-bottom: 0;
  }
`;

const Like = styled.p`
  font-weight: 400;
  font-size: ${({ theme }) => theme.fontSizes.s};
  line-height: 16px;
  margin-right: 20px;
  margin-left: 8px;
`;

const LikeDiv = styled.div`
  display: flex;
  flex-direction: row;
`;

const Comment = styled.p`
  font-weight: 400;
  font-size: ${({ theme }) => theme.fontSizes.s};
  line-height: 16px;
  margin-right: 40px;
  margin-left: 8px;
`;

const PostUserId = styled.p`
  font-weight: 700;
  font-size: ${({ theme }) => theme.fontSizes.s};
  line-height: 18px;
  margin-right: 10px;
  @media ${({ theme }) => theme.device.mobile} {
    margin-right: 40px;
    font-size: ${({ theme }) => theme.fontSizes.l};
  }
`;

const PostCategory = styled.button`
  font-weight: 700;
  font-size: ${({ theme }) => theme.fontSizes.s};
  line-height: 14px;
  height: 29px;
  width: 77px;
  background-color: #f2f2f2;
  border: none;
  border-radius: 8px;
  margin-right: 10px;
  @media ${({ theme }) => theme.device.mobile} {
    margin-right: 16px;
  }
`;

const PictureDiv = styled.div`
  width: 30vw;
  height: 30vw;
  margin: 15px auto;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: 15px;
  @media all and (min-width: 650px) {
    margin: 0px auto;
  }
  @media ${({ theme }) => theme.device.mobile} {
    width: 276px;
    height: 217px;
    margin: 0px auto;
  }
`;

const Picture = styled.img`
  width: 30vw;
  height: 30vw;
  margin: auto;
  border-radius: 15px;
  object-fit: cover;
  transition: all 0.1s linear;
  opacity: ${({ hasImage }) => !hasImage && "0.15"};
  @media ${({ theme }) => theme.device.mobile} {
    width: 276px;
    height: 217px;
  }
`;

export default TextCard;
