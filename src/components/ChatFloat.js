import { Link, useLocation, useMatch } from "react-router-dom";
import styled from "styled-components";

import { SmileChatSVG } from "../elements/SVG";

// 우측 하단 채팅 플로팅 버튼
const ChatFloat = () => {
  const location = useLocation();
  const isChatModalOn = useMatch("/chat/*");

  return (
    <>
      {!isChatModalOn && (
        <FloatWrap>
          <Link to="/chat" state={{ backgroundLocation: location }}>
            <ChatButton>
              <div>
                <SmileChatSVG />
                <span>채팅</span>
              </div>
            </ChatButton>
          </Link>
        </FloatWrap>
      )}
    </>
  );
};

const FloatWrap = styled.div`
  z-index: 99;
  position: fixed;
  bottom: 30px;
  right: 30px;
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
