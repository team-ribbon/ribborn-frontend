import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { SmileChatSVG } from "../elements/SVG";
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
        {!chatToggle && (
          <ChatButton onClick={onClickToggle}>
            <div>
              <SmileChatSVG />
              <span>채팅</span>
            </div>
          </ChatButton>
        )}
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
  bottom: 30px;
  right: 30px;
`;

const ChatWrap = styled.div`
  position: relative;
`;

const Dim = styled.div`
  box-sizing: border-box;
  display: ${({ chatToggle }) => (chatToggle ? "block" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.6);
`;

const ChatButton = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  border: none;
  background: #ffffff;
  box-shadow: 4px 4px 25px rgba(0, 25, 72, 0.21);
  font-size: ${({ theme }) => theme.fontSizes.s};
  cursor: pointer;
  div {
    text-align: center;
    padding-top: 20px;
  }
  span {
    display: block;
    padding-top: 5px;
  }
`;

export default ChatFloat;
