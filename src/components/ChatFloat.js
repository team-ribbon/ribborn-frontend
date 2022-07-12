import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import ChatModal from "./ChatModal";

const ChatFloat = () => {
  const location = useLocation();

  const [chatToggle, setChatToggle] = useState(false);

  const onClickToggle = () => {
    setChatToggle((prev) => !prev);
  };
  return (
    <FloatWrap>
      <Link to="/chat" state={{ backgroundLocation: location }}>
        {!chatToggle && <button onClick={onClickToggle}>채팅</button>}
      </Link>
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
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.6);
`;

export default ChatFloat;
