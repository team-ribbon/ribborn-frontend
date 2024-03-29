import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useMatch } from "react-router-dom";
import styled from "styled-components";

import { setNotification } from "../redux/modules/chat";
import { SmileChatSVG } from "../elements/SVG";

// 우측 하단 채팅 플로팅 버튼
const ChatFloat = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const isChatModalOn = useMatch("/chat/*");
  const notification = useSelector((state) => state.chat.notification);
  const userId = useSelector((state) => state.user.user?.id);
  const eventSource = useRef();

  useEffect(() => {
    if (userId) {
      // SSE 구독 요청
      eventSource.current = new EventSource(
        `${process.env.REACT_APP_CHAT_URL}/user/subscribe/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // 서버에서 메시지가 전송될 때 실행되는 함수
      eventSource.current.onmessage = (message) => {
        if (!message.data.includes("EventStream Created")) {
          dispatch(setNotification(true));
        }
      };
    }
    return () => {
      // 언마운트 시 연결 종료
      if (eventSource.current) {
        eventSource.current.close();
        eventSource.current = null;
      }
    };
  }, [userId, dispatch]);

  return (
    <>
      {userId && !isChatModalOn && (
        <FloatWrap>
          <Link to="/chat" state={{ backgroundLocation: location }}>
            <ChatButtonWrap>
              <ChatButton>
                {notification && <NewNoti />}
                <SmileChatSVG />
                <span>채팅</span>
              </ChatButton>
            </ChatButtonWrap>
          </Link>
        </FloatWrap>
      )}
    </>
  );
};

const FloatWrap = styled.div`
  z-index: 9;
  position: fixed;
  bottom: 30px;
  right: 30px;
  @media screen and (max-width: ${({ theme }) => theme.deviceSizes.mobile}) {
    bottom: 20px;
    right: 20px;
  }
`;
const ChatButtonWrap = styled.div`
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
const ChatButton = styled.div`
  position: relative;
`;
const NewNoti = styled.div`
  width: 14px;
  height: 14px;
  border-radius: 10px;
  position: absolute;
  right: 5px;
  bottom: 45px;
  background-color: ${({ theme }) => theme.colors.orange};
  @media screen and (max-width: ${({ theme }) => theme.deviceSizes.mobile}) {
    right: 2px;
    bottom: 40px;
  }
  &:before {
    position: absolute;
    left: 0;
    top: -10%;
    width: 100%;
    height: 120%;
    background: ${({ theme }) => theme.colors.orange};
    filter: blur(10px);
    content: "";
    opacity: 0;
    animation: flash 0.9s ease-out alternate infinite;
  }
  @keyframes flash {
    to {
      opacity: 1;
    }
  }
`;

export default ChatFloat;
