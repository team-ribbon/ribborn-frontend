import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { CommentSVG, HeartSVG } from "../elements/SVG";
import Regions from "../shared/Regions";

// 메인, 커뮤니티 > 리폼 리뷰 게시판에 사용되는 카드
const CardA = ({ postObj, type, reform, inViewRef }) => {
  const navigate = useNavigate();

  return (
    <Article
      onClick={() => {
        reform
          ? navigate(`/reformdetail/${postObj.id}`)
          : navigate(`/reviewdetail/${postObj.id}`);
      }}
    >
      <ImageWrap ref={inViewRef}>
        <Image
          alt="card"
          src={postObj?.image || "/images/textLogo.png"}
          hasImage={postObj?.image}
        />
      </ImageWrap>
      <Content>
        <Title>{postObj.title}</Title>
        {type === "A" && <Nickname>@{postObj.nickname}</Nickname>}
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
        {type === "C" && (
          <Region>
            {Regions.map((element) => {
              return element.value === postObj.region && element.text;
            })}
          </Region>
        )}
      </Content>
    </Article>
  );
};
const Article = styled.article`
  cursor: pointer;
  animation: 0.6s ease-in-out loadEffect;

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
const ImageWrap = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 0;
  padding-bottom: 66%;
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
  transition: all 0.1s linear;
  opacity: ${({ hasImage }) => !hasImage && "0.15"};
  &:hover {
    transform: scale(1.05);
  }
`;
const Bookmark = styled.button`
  position: absolute;
  z-index: 1;
  right: 0;
`;
const Content = styled.div`
  display: flex;
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
const Nickname = styled.p`
  white-space: nowrap;
`;
const Region = styled.div`
  margin: -10px;
  padding-left: 10px;
  font-size: ${({ theme }) => theme.fontSizes.s};
`;
const Title = styled.p`
  font-weight: 700;
  white-space: break-spaces;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  font-size: ${({ theme }) => theme.fontSizes.l};
`;
const Tag = styled.div`
  white-space: nowrap;
  font-size: ${({ theme }) => theme.fontSizes.s};
  padding: 7px 13.5px 6px 13.5px;
  border-radius: 8px;
  background-color: ${({ process }) =>
    process === "after"
      ? "rgba(50, 47, 90, 0.43)"
      : process === "ing"
      ? "rgba(255, 140, 40, 0.43)"
      : "rgba(0, 174, 30, 0.43)"};
`;
export default CardA;
