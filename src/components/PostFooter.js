import React from "react";
import styled from "styled-components";

const PostFooter = () => {
  const inputCurrent = React.useRef(null);

  return (
    <>
      <HR />
      <CommentDiv>
        <IDDiv>
          <p>관심 106</p>
          <p>댓글 68</p>
        </IDDiv>
        <MessageCover>
          <MessageInput
            placeholder="기분 좋은 말 한마디는 모두에게 긍정적인 에너지를 줘요 :)"
            id="messageInput"
            ref={inputCurrent}
            autoComplete="off"
          />
          <MessageBtn
          // inputValue={inputCurrent === "" ? false : true}
          // onClick={sendMessage}
          >
            입력
          </MessageBtn>
        </MessageCover>
        {[1, 2, 3].map((v) => {
          return (
            <Comment>
              <p>ID: 고구미</p>
              <p>깔끔하고 이쁘네요!</p>
              <p>1시간 전</p>
            </Comment>
          );
        })}
      </CommentDiv>
    </>
  );
};

const IDDiv = styled.div`
  display: flex;
  gap: 30px;
`;

const HR = styled.hr`
  width: calc(100vw - 200px);
`;

const CommentDiv = styled.div`
  width: calc(100vw - 200px);
  margin-left: 100px;
`;

const MessageCover = styled.section`
  width: 100%;
  height: 30px;
  margin: 20px auto;
  position: relative;
  border: none;
  background-color: #ddd;
`;

const MessageInput = styled.input`
  position: absolute;
  top: 50%;
  left: 2px;
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
  color: black;
  font-weight: ${(props) => (props.inputValue ? "bold" : "normal")};
  position: absolute;
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

export default PostFooter;
