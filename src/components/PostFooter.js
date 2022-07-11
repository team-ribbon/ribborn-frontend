import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { PostCommentDB } from "../modules/post";

const PostFooter = ({ commentsList, id }) => {
  const inputCurrent = React.useRef(null);
  const dispatch = useDispatch();

  const sendMessage = () => {
    dispatch(PostCommentDB(id, inputCurrent.current.value));
  };

  return (
    commentsList && (
      <PostFooterWrap>
        <HR />
        <CommentDiv>
          <CommentCount>댓글 {commentsList.length}</CommentCount>
          <MessageCover>
            <MessageInput
              placeholder="기분 좋은 말 한마디는 모두에게 긍정적인 에너지를 줘요 :)"
              id="messageInput"
              ref={inputCurrent}
              autoComplete="off"
            />
            <MessageBtn onClick={sendMessage}>입력</MessageBtn>
          </MessageCover>
          {commentsList.map((v) => {
            return (
              <Comment>
                <CommentFistLine>
                  <CommentNickname>@{v.nickname}</CommentNickname>
                  <CommentContent>{v.comment}</CommentContent>
                </CommentFistLine>
                <CreatedAt>{v.createAt}</CreatedAt>
              </Comment>
            );
          })}
        </CommentDiv>
      </PostFooterWrap>
    )
  );
};

const PostFooterWrap = styled.div`
  margin-top: 70px;
`;

const CommentCount = styled.span`
  font-weight: 400;
  font-size: 18px;
  line-height: 24px;
`;

const HR = styled.hr`
  width: 700px;
  color: #f2f2f2;
`;

const CommentDiv = styled.div`
  width: 700px;
  margin: 0px auto 30px auto;
`;

const MessageCover = styled.section`
  width: 100%;
  height: 46px;
  margin: 16px auto 0px auto;
  position: relative;
  border: none;
  background: #ffffff;
  border: 1px solid #f2f2f2;
  border-radius: 8px;
`;

const MessageInput = styled.input`
  position: absolute;
  top: 50%;
  left: 2px;
  height: 46px;
  width: calc(100% - 67px);
  border: transparent;
  background-color: transparent;
  transform: translate(0%, -50%);
  &:focus {
    outline: none;
    box-shadow: none;
  }
`;

const MessageBtn = styled.button`
  border: none;
  background-color: transparent;
  width: 50px;
  height: 30px;
  width: fit-content;
  color: #afb0b3;
  position: absolute;
  font-weight: 700;
  font-size: 15px;
  line-height: 18px;
  right: 15px;
  top: 50%;
  transform: translate(0%, -50%);
  :hover {
    cursor: pointer;
  }
`;

const Comment = styled.div`
  margin: 30px auto 0px auto;
`;

const CommentFistLine = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 16px;
`;

const CommentNickname = styled.span`
  font-weight: 700;
  font-size: 14px;
  line-height: 18px;
  color: #222222;
`;

const CommentContent = styled.span`
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  margin-left: 16px;
  color: #222222;
`;

const CreatedAt = styled.span`
  font-weight: 400;
  font-size: 11px;
  line-height: 14px;
  color: #afb0b3;
`;

export default PostFooter;
