import React from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { HeartSVG } from "../elements/SVG";
import { TagTextColor } from "../elements/TagTextColor";

// 메인, LOOKBOOK 게시판에 사용되는 카드
const CardB = ({ postObj, hot, isMain, inViewRef }) => {
  const navigate = useNavigate();

  return (
    <Article
      onClick={() => {
        navigate(`/lookbookdetail/${postObj.id}`);
      }}
    >
      <ImageWrap isMain={isMain} ref={inViewRef}>
        <ImageDim id="dim" />
        <Image alt="lookbook" src={postObj.image} />
        <Title>
          {postObj.nickname} <span>님의 작업</span>
        </Title>
        <Date>{moment(postObj.createAt).format("YYYY.MM.DD")}</Date>
        {hot && <Hot>HOT 🔥</Hot>}
      </ImageWrap>
      {!isMain && (
        <Content>
          <div>
            <HeartSVG />
            <span>{postObj.likeCount}</span>
            <Tag>
              <TagTextColor>{postObj?.category?.toUpperCase()}</TagTextColor>
            </Tag>
          </div>
        </Content>
      )}
    </Article>
  );
};
const Article = styled.article`
  cursor: pointer;
  &:hover {
    img {
      transform: scale(1.05);
    }
    #dim {
      background-color: rgba(0, 0, 0, 0.4);
    }
  }
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
  padding-bottom: ${({ isMain }) => (isMain ? "100%" : "56%")};
  border-radius: 15px;
`;
const ImageDim = styled.div`
  background-color: rgba(0, 0, 0, 0.25);
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1;
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
`;
const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  margin: 17px 0;
  padding: 0 17px;
  div {
    display: flex;
    align-items: center;
  }
  span {
    padding-top: 3px;
    margin: 0 16px 0 8px;
    font-size: ${({ theme }) => theme.fontSizes.s};
  }
  p {
    font-weight: 700;
  }
`;
const Title = styled.div`
  position: absolute;
  font-size: ${({ theme }) => theme.fontSizes.l};
  font-weight: 700;
  padding: 0 20px;
  color: #fff;
  bottom: 47px;
  z-index: 2;
  span {
    font-weight: 400;
  }
  @media all and (max-width: 330px) {
    font-size: ${({ theme }) => theme.fontSizes.m};
  }
`;
const Date = styled.div`
  position: absolute;
  color: #fff;
  bottom: 20px;
  font-weight: 700;
  padding: 0 20px;
  z-index: 2;
`;
const Hot = styled.div`
  position: absolute;
  bottom: 47px;
  right: 20px;
  font-weight: 700;
  background-color: ${({ theme }) => theme.colors.orange};
  border-radius: 8px;
  padding: 8px 15px;
  z-index: 2;
`;
const Tag = styled.div`
  font-weight: 700;
  padding: 8px 15px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.lighterGray};
`;

export default CardB;
