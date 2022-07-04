import styled from "styled-components";

import Categories from "../shared/Categories";

const TextCard = ({ postObj }) => {
  return (
    <PostDiv key={"post" + postObj.postId}>
      <TextDiv>
        <Title>{postObj.title}</Title>
        <Content>{postObj.content}</Content>
        <PostFooter>
          <Like>좋아요 {postObj.likeCount}</Like>
          <Comment>댓글 {postObj.commentCount}</Comment>
          <PostUserId>ID: {postObj.nickname}</PostUserId>
          {Categories.map((w) => {
            return w.value === postObj.category ? (
              <PostCategory key={"postCategory" + w.value}>
                {w.text}
              </PostCategory>
            ) : null;
          })}
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

const Title = styled.p`
  font-size: 20px;
  margin: 20px auto 10px auto;
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
