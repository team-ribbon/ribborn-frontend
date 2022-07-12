import { useState } from "react";
import styled from "styled-components";
import ChatModal from "./ChatModal";

const ChatFloat = () => {
  const [chatToggle, setChatToggle] = useState(false);

  const onClickToggle = () => {
    setChatToggle((prev) => !prev);
  };
  return (
    <FloatWrap>
      {!chatToggle && <button onClick={onClickToggle}>채팅</button>}
      <ChatWrap>
        <Dim chatToggle={chatToggle} />
        {chatToggle && <ChatModal setChatToggle={setChatToggle} />}
      </ChatWrap>
    </FloatWrap>
  );
};

const FloatWrap = styled.div`
  z-index: 99;
  position: fixed;
  bottom: 0;
  right: 0;
`;

const ChatWrap = styled.div`
  position: relative;
`;

const Dim = styled.div`
  box-sizing: border-box;
  display: ${(props) => (props.chatToggle ? "block" : "none")};
  /* display: block; */
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.6);
`;

export default ChatFloat;
