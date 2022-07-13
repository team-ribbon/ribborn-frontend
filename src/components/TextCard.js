import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import Categories from "../shared/Categories";
import Regions from "../shared/Regions";
import { HiOutlineHeart } from "react-icons/hi";
import { IoChatbubbleOutline } from "react-icons/io5";

const TextCard = ({ postObj, noWriter, reform }) => {
  const navigate = useNavigate();

  let process = null;
  switch (postObj.process) {
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
    <PostDiv
      key={"post" + postObj.postId}
      onClick={() => {
        reform
          ? navigate(`/reformdetail/${postObj.id}`)
          : navigate(`/qnadetail/${postObj.id}`);
      }}
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
            <>
              <HiOutlineHeart size="16" /> <Like>{postObj.likeCount}</Like>
            </>
          )}
          {reform ? null : (
            <>
              <IoChatbubbleOutline size="16" />
              <Comment>{postObj.commentCount}</Comment>
            </>
          )}
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
        </PostFooter>
        {reform
          ? null
          : Categories.map((w) => {
              return w.value === postObj.category ? (
                <PostCategory key={"postCategory" + w.value}>
                  {w.text}
                </PostCategory>
              ) : null;
            })}
      </TextDiv>
      <PictureDiv>
        <Picture
          src={
            postObj.image !== null
              ? postObj.image
              : "http://openimage.interpark.com/goods_image_big/1/4/1/9/9090461419_l.jpg"
          }
        />
      </PictureDiv>
    </PostDiv>
  );
};

const PostDiv = styled.div`
  width: 100%;
  border-bottom: 1px solid #ccc;
  margin-bottom: 20px;
  height: 256px;
  display: flex;
  flex-direction: row;
`;

const TextDiv = styled.div`
  width: 80%;
`;

const TitleContentWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

const TitleDiv = styled.div``;

const Title = styled.p`
  font-size: 18px;
  font-weight: 700;
  margin: 20px auto 10px;
  float: left;
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

const Content = styled.p`
  font-weight: 400;
  font-size: 15px;
  line-height: 28px;
  overflow: hidden;
  height: 80px;
  width: 80%;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  color: #222222;
`;

const PostFooter = styled.div`
  margin: 20px auto;
  display: flex;
  align-items: center;
`;

const Like = styled.p`
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  margin-right: 20px;
  margin-left: 8px;
`;

const Comment = styled.p`
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  margin-right: 40px;
  margin-left: 8px;
`;

const PostUserId = styled.p`
  font-weight: 700;
  font-size: 15px;
  line-height: 18px;
  margin-right: 40px;
`;

const PostCategory = styled.button`
  font-weight: 700;
  font-size: 11px;
  line-height: 14px;
  height: 29px;
  width: 77px;
  background-color: #f2f2f2;
  border: none;
  border-radius: 8px;
  margin-right: 30px;
`;

const PictureDiv = styled.div`
  width: 276px;
  height: 217px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Picture = styled.img`
  width: 276px;
  height: 217px;
  margin: auto;
  border-radius: 15px;
`;

export default TextCard;
