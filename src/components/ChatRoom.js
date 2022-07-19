import SockJS from "sockjs-client";
import Stomp from "stompjs";

import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useEffect, useRef } from "react";
import { addMessage } from "../redux/modules/chat";
import ChatList from "./ChatList";
import { Input } from "../elements/Inputs";
import { MainBtn } from "../elements/Buttons";
import { useParams } from "react-router-dom";

// 채팅 모달 > 채팅방
const ChatRoom = () => {
  const dispatch = useDispatch();
  const { roomId } = useParams();
  const user = useSelector((state) => state.user.user);
  let stompClient = useRef(null);

  // 웹소켓 연결 요청 후 구독 요청
  const socketConnect = () => {
    const webSocket = new SockJS(`${process.env.REACT_APP_CHAT_URL}/ws-stomp`);
    stompClient = Stomp.over(webSocket);
    stompClient.connect(
      {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        type: "TALK",
      },
      () => {
        stompClient.subscribe(
          `/sub/chat/room/${roomId}`,
          (response) => {
            const messageFromServer = JSON.parse(response.body);
            console.log("messageFromServer", messageFromServer);
            dispatch(addMessage(messageFromServer));
          },
          { Authorization: `Bearer ${localStorage.getItem("token")}` }
        );
      }
    );
  };

  // 웹소켓 연결 해제
  const socketDisconnect = () => {
    if (stompClient) stompClient.disconnect();
  };

  // 메시지 전송
  const sendMessage = (event) => {
    event.preventDefault();
    if (event.target.chat.value === "") return false;

    const chatData = {
      roomId: roomId,
      senderId: user.id,
      message: event.target.chat.value,
      isRead: false,
      type: "TALK",
    };

    stompClient.send(
      `/pub/chat/message`,
      { Authorization: `Bearer ${localStorage.getItem("token")}` },
      JSON.stringify(chatData)
    );

    event.target.chat.value = null;
  };

  useEffect(() => {
    // 채팅방 전환 시 기존 연결 해제 후 새 연결 요청
    if (stompClient.current) {
      socketDisconnect();
    }
    socketConnect();

    // 언마운트 시 연결 해제
    return () => {
      socketDisconnect();
    };
  }, [roomId]);

  return (
    <div>
      <ChatList />
      <ChatInputWrap>
        <form onSubmit={sendMessage}>
          <ChatInput
            name="chat"
            autoComplete="off"
            placeholder="메시지를 입력해주세요."
          />
          <SendButton>보내기</SendButton>
        </form>
      </ChatInputWrap>
    </div>
  );
};

const ChatInputWrap = styled.div`
  margin: 30px;
  border-radius: 15px;
  border: 1px solid ${({ theme }) => theme.colors.gray};
`;
const ChatInput = styled(Input)`
  border: none;
  width: calc(100% - 100px);
  &:focus {
    outline: none;
  }
`;
const SendButton = styled(MainBtn)`
  padding: 10px 20px;
  font-size: ${({ theme }) => theme.fontSizes.m};
`;

export default ChatRoom;
