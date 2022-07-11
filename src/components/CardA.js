import React from "react";
import styled from "styled-components";
import { CommentSVG, HeartSVG } from "../elements/SVG";

// 메인, 커뮤니티 > 리폼 리뷰 게시판에 사용되는 카드
const CardA = ({ postObj, type }) => {
  return (
    <article>
      <ImageWrap>
        <Image alt="card" src={postObj.image} />
      </ImageWrap>
      <Content>
        <Title>{postObj.title}</Title>
        {type === "A" && <p>@{postObj.nickname}</p>}
        {type === "C" && (
          <Tag process={postObj?.process}>
            {postObj.process === "after"
              ? "완료"
              : postObj.process === "ing"
              ? "진행중"
              : "모집중"}
          </Tag>
        )}
      </Content>
      <Content type={type}>
        {type === "A" && (
          <div>
            <HeartSVG />
            <span>{postObj.likeCount}</span>
            <CommentSVG />
            <span>{postObj.commentCount}</span>
          </div>
        )}
        {type === "C" && <span>{postObj.region}</span>}
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
  background: rgba(0, 0, 0, 0.1);
  border-radius: 15px;
`;
const Image = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 15px;
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
  align-items: center;
  margin: 15px 0;
  padding: 0 17px;
  div {
    display: flex;
    align-items: center;
  }
  span {
    padding-top: 3px;
    margin: ${({ type }) => (type === "C" ? "0" : "0 16px 0 8px")};
    font-size: ${({ theme }) => theme.fontSizes.s};
  }
  p {
    font-weight: 700;
  }
`;
const Title = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.l};
`;
const Tag = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.s};
  padding: 6.5px 13.5px;
  border-radius: 8px;
  background-color: ${({ process }) =>
    process === "after"
      ? "rgba(50, 47, 90, 0.43)"
      : process === "ing"
      ? "rgba(255, 140, 40, 0.43)"
      : "rgba(0, 174, 30, 0.43)"};
`;
export default CardA;
