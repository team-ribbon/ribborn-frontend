import React from "react";
import styled from "styled-components";
import { HeartSVG } from "../elements/SVG";

// 메인, LOOKBOOK 게시판에 사용되는 카드
const CardB = ({ postObj, hot, isMain }) => {
  return (
    <article>
      <ImageWrap isMain>
        <ImageDim />
        <Image alt="lookbook" src={postObj.image} />
        <Title>
          {postObj.nickname} <span>님의 작업</span>
        </Title>
        <Date>{postObj.createAt}</Date>
        {hot && <Hot>HOT 🔥</Hot>}
      </ImageWrap>
      {!isMain && (
        <Content>
          <div>
            <HeartSVG />
            <span>{postObj.likeCount}</span>
            <Tag>
              <TagText>{postObj?.category?.toUpperCase()}</TagText>
            </Tag>
          </div>
        </Content>
      )}
    </article>
  );
};
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
const TagText = styled.div`
  background: linear-gradient(
    268.58deg,
    #322f5a 25.29%,
    #ff8c28 50.14%,
    #00ae1e 85.17%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

export default CardB;