import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

import {
  addMessage,
  getRoomListDB,
  readMessage,
  updateRoomMessage,
} from "../redux/modules/chat";
import { apis } from "../shared/api";
import ChatList from "./ChatList";
import LoadingSpinner from "./LoadingSpinner";

import { Input } from "../elements/Inputs";
import { MainBtn } from "../elements/Buttons";

// 채팅 모달 > 채팅방
const ChatRoom = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { roomId } = useParams();
  const inputRef = useRef();
  let stompClient = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector((state) => state.user.user);

  // 웹소켓 연결 요청 & 구독 요청
  const socketConnect = () => {
    const webSocket = new SockJS(`${process.env.REACT_APP_CHAT_URL}/wss-stomp`);
    stompClient.current = Stomp.over(webSocket);

    // STOMPJS console log 지워주는 부분
    stompClient.current.debug = null;

    stompClient.current.connect(
      {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        type: "TALK",
      },

      // 연결 성공 시 실행되는 함수
      () => {
        stompClient.current.subscribe(
          `/sub/chat/room/${roomId}`,
          (response) => {
            const messageFromServer = JSON.parse(response.body);
            dispatch(addMessage(messageFromServer));
            dispatch(
              updateRoomMessage({
                ...messageFromServer,
                index: location.state.index ?? 0,
              })
            );
          },
          { Authorization: `Bearer ${localStorage.getItem("token")}` }
        );
        setIsLoading(false);
      }
    );
  };

  // 웹소켓 연결 해제
  const socketDisconnect = () => {
    stompClient.current.disconnect();
    stompClient.current = null;
  };

  // 메시지 전송
  const sendMessage = (event) => {
    event.preventDefault();

    const message = event.target.chat.value;

    if (message === "" || message.trim() === "") return false;

    const messageObj = {
      roomId: roomId,
      senderId: user.id,
      message: event.target.chat.value,
      isRead: false,
      type: "TALK",
      nickname: user.nickname,
    };

    stompClient.current.send(
      `/pub/chat/message`,
      { Authorization: `Bearer ${localStorage.getItem("token")}` },
      JSON.stringify(messageObj)
    );

    event.target.chat.value = null;
  };

  useEffect(() => {
    setIsLoading(true);
    inputRef.current.value = "";

    // 채팅방 전환 시 기존 연결 해제 후 새 연결 요청
    if (stompClient.current) {
      socketDisconnect();
    }
    socketConnect();

    return () => {
      // 언마운트 시 연결 해제
      if (stompClient.current) socketDisconnect();
      dispatch(readMessage(location.state.index));
    };
  }, [roomId]);

  // 채팅방 나가기
  const exitRoom = async () => {
    const confirm = window.confirm("채팅방을 나가시겠어요?");
    if (confirm) {
      await apis.exitRoom(roomId);
      dispatch(getRoomListDB()).then(() => navigate(-1));
    }
  };

  return (
    <>
      {isLoading && <LoadingSpinner />}
      <ChatInputWrap>
        <form onSubmit={sendMessage}>
          <ChatInput
            ref={inputRef}
            name="chat"
            autoComplete="off"
            placeholder="메시지를 입력해주세요."
            maxLength={150}
          />
          <SendButton>보내기</SendButton>
        </form>
      </ChatInputWrap>
      <ChatList />
      <ExitButton onClick={exitRoom}>나가기</ExitButton>
    </>
  );
};

const ChatInputWrap = styled.div`
  margin: 0 30px 30px 30px;
  border-radius: 15px;
  border: 1px solid ${({ theme }) => theme.colors.gray};
  @media screen and (max-width: ${({ theme }) => theme.deviceSizes.mobile}) {
    margin: 0 10px 10px 10px;
  }
`;
const ChatInput = styled(Input)`
  border: none;
  width: calc(100% - 100px);
  &:focus {
    outline: none;
  }
  @media screen and (max-width: ${({ theme }) => theme.deviceSizes.mobile}) {
    width: calc(100% - 90px);
    padding: 20px 10px 20px 15px;
    font-size: ${({ theme }) => theme.fontSizes.m};
  }
`;
const SendButton = styled(MainBtn)`
  padding: 10px 20px;
  font-size: ${({ theme }) => theme.fontSizes.m};
`;
const ExitButton = styled(SendButton)`
  color: ${({ theme }) => theme.colors.black};
  background-color: #fff;
  border: solid 1px ${({ theme }) => theme.colors.black};
  font-size: ${({ theme }) => theme.fontSizes.s};
  padding: 5px 10px;
  position: absolute;
  z-index: 2;
  top: 18px;
  right: 60px;
`;

export default ChatRoom;
