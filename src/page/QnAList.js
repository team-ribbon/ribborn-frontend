import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";

import Post, { getQnAListDB } from "../modules/post";

function QnAList() {
  const dispatch = useDispatch();

  const [category, setCategory] = React.useState("all");
  const postlists = useSelector((state) => state.post.QnAList.posts);

  React.useEffect(() => {
    dispatch(getQnAListDB());
  }, [category]);

  const categories = [
    {
      value: "all",
      text: "전체",
    },
    {
      value: "clothes",
      text: "옷 리폼",
    },
    {
      value: "furniture",
      text: "가구 리폼",
    },
    {
      value: "shoes",
      text: "신발 리폼",
    },
    {
      value: "goods",
      text: "기타리폼",
    },
    {
      value: "diy",
      text: "DIY",
    },
  ];

  const categorySearch = {
    all: "전체",
    clothes: "옷 리폼",
    furniture: "가구 리폼",
    shoes: "신발 리폼",
    goods: "기타리폼",
    diy: "DIY",
  };

  return (
    <Template>
      <ButtonDiv>
        {categories.map((v) => {
          return (
            <CategoryBtn
              onClick={() => {
                setCategory(v.value);
              }}
              key={v.value + "categorybtn"}
            >
              {v.text}
            </CategoryBtn>
          );
        })}
      </ButtonDiv>
      <PostCoverDiv>
        <AskBtn>질문하기</AskBtn>
        {postlists.map((v) => {
          return (
            <PostDiv key={v.postId}>
              <TextDiv>
                <Title>{v.title}</Title>
                <Content>{v.content}</Content>
                <PostFooter>
                  <Like>좋아요 {v.likeCount}</Like>
                  <Comment>댓글 {v.commentCount}</Comment>
                  <PostUserId>ID: {v.nickname}</PostUserId>
                  {categories.map((w) => {
                    return w.value === v.category ? (
                      <PostCategory>{w.text}</PostCategory>
                    ) : null;
                  })}
                </PostFooter>
              </TextDiv>
              <PictureDiv>
                <Picture src={v.image} />
              </PictureDiv>
            </PostDiv>
          );
        })}
      </PostCoverDiv>
    </Template>
  );
}

const Template = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ButtonDiv = styled.div`
  width: fit-content;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const CategoryBtn = styled.button`
  background-color: #ddd;
  border: none;
  margin: auto 10px;
  width: 100px;
  height: 60px;
  :hover {
    cursor: pointer;
  }
`;

const PostCoverDiv = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
`;

const AskBtn = styled.button`
  background-color: #ddd;
  border: none;
  margin: 20px 0px;
  width: 100px;
  height: 60px;
  float: left;
  :hover {
    cursor: pointer;
  }
`;

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

export default QnAList;
