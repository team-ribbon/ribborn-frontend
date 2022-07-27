import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useMatch } from "react-router-dom";
import styled from "styled-components";

import { SmileChatSVG } from "../elements/SVG";

// 우측 하단 채팅 플로팅 버튼
const ChatFloat = () => {
  const location = useLocation();
  const isChatModalOn = useMatch("/chat/*");
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    if (user) {
      // 구독 요청
      const eventSource = new EventSource(
        `${process.env.REACT_APP_CHAT_URL}/user/subscribe/${user.id}`
        // { withCredentials: true }
      );

      // 연결 성공 시 실행
      eventSource.onopen = (event) => {
        console.log("연결 성공", event.target.readyState);
      };

      // 에러 발생 시 실행
      eventSource.onerror = (event) => {
        console.log("에러 :", event.target.readyState, event);
        eventSource.close();
      };

      // 서버에서 보내는 데이터 받기
      eventSource.onmessage = (message) => {
        const parsedData = JSON.parse(message.data);
        console.log("parsedData", parsedData);
      };
    }
  }, [user]);

  return (
    <>
      {user && !isChatModalOn && (
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
  @media screen and (max-width: ${({ theme }) => theme.deviceSizes.mobile}) {
    bottom: 20px;
    right: 20px;
  }
`;
const ChatButton = styled.div`
  width: 57px;
  height: 57px;
  border-radius: 50px;
  border: none;
  background: #ffffff;
  box-shadow: 4px 4px 25px rgba(0, 25, 72, 0.21);
  font-size: ${({ theme }) => theme.fontSizes.s};
  cursor: pointer;
  div {
    text-align: center;
    padding-top: 9px;
    @media ${({ theme }) => theme.device.mobile} {
      padding-top: 14px;
    }
  }
  span {
    display: block;
    padding-top: 0px;
    @media ${({ theme }) => theme.device.mobile} {
      padding-top: 5px;
    }
  }
  @media ${({ theme }) => theme.device.mobile} {
    width: 67px;
    height: 67px;
  }
`;

export default ChatFloat;
