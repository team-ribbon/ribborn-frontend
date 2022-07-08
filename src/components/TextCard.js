import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import Categories from "../shared/Categories";

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
          ? navigate(`/reformdetail/${postObj.postId}`)
          : navigate(`/qnadetail/${postObj.postId}`);
      }}
    >
      <TextDiv>
        <TitleDiv>
          {reform ? <PostProcess>{process}</PostProcess> : null}
          <Title>{postObj.title}</Title>
        </TitleDiv>
        <Content>{postObj.content}</Content>
        <PostFooter>
          {reform ? null : <Like>좋아요 {postObj.likeCount}</Like>}
          {reform ? null : <Comment>댓글 {postObj.commentCount}</Comment>}
          {noWriter ? null : <PostUserId>@{postObj.nickname}</PostUserId>}
          {Categories.map((w) => {
            return w.value === postObj.category ? (
              <PostCategory key={"postCategory" + w.value}>
                {w.text}
              </PostCategory>
            ) : null;
          })}
          {reform ? <PostCategory>{postObj.region}</PostCategory> : null}
        </PostFooter>
      </TextDiv>
      <PictureDiv>
        <Picture src={postObj.image} />
      </PictureDiv>
    </PostDiv>
  );
};

const PostDiv = styled.div`
  width: 100%;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  height: 140px;
  display: flex;
  flex-direction: row;
`;

const TextDiv = styled.div`
  width: 80%;
`;

const TitleDiv = styled.div`
  display: inline-block;
`;

const Title = styled.p`
  font-size: 20px;
  margin: 20px auto 10px auto;
  float: left;
`;

const PostProcess = styled.button`
  font-size: 13px;
  height: 20px;
  background-color: #ddd;
  border: none;
  border-radius: 20px;
  margin: 20px auto auto 10px;
`;

const Content = styled.p`
  font-size: 15px;
  line-height: 20px;
  overflow: hidden;
  height: 40px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const PostFooter = styled.div`
  margin: 10px auto;
  display: flex;
`;

const Like = styled.p`
  font-size: 13px;
  margin-right: 20px;
`;

const Comment = styled.p`
  font-size: 13px;
  margin-right: 40px;
`;

const PostUserId = styled.p`
  font-size: 13px;
  margin-right: 30px;
`;

const PostCategory = styled.button`
  font-size: 13px;
  height: 20px;
  background-color: #ddd;
  border: none;
  border-radius: 20px;
`;

const PictureDiv = styled.div`
  width: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Picture = styled.img`
  max-width: 90%;
  max-height: 120px;
  margin: auto;
`;

export default TextCard;
