import React from "react";
import styled from "styled-components";

const Card = ({ postObj, noWriter, noComment }) => {
  return (
    <article>
      <ImageWrap>
        {/* <Bookmark>북</Bookmark> */}
        <Image alt="card" src={postObj.image} />
      </ImageWrap>
      <Content>
        <span>좋아요 {postObj.likeCount}</span>
        {noComment ? null : <span>댓글 {postObj.commentCount}</span>}
        {noWriter ? null : <span>{postObj.nickname}</span>}
        <div>{postObj.title}</div>
      </Content>
    </article>
  );
};

const ImageWrap = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 0;
  padding-bottom: 66%;
`;
const Image = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
const Bookmark = styled.button`
  position: absolute;
  z-index: 1;
  right: 0;
`;
const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  div {
    width: 100%;
  }
`;

export default Card;
