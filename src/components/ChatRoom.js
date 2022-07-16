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

  const socketConnect = () => {
    const webSocket = new SockJS("http://13.125.117.133:8888/ws-stomp");
    stompClient = Stomp.over(webSocket);
    stompClient.connect(
      {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        type: "TALK",
      },
      () => {
        // console.log(client.ws.readyState);
        stompClient.subscribe(
          `/sub/chat/room/${roomId}`,
          (response) => {
            const messageFromServer = JSON.parse(response.body);
            console.log(messageFromServer);
            //     //     // {"messageId":21,"senderId":2,"message":"fffff","date":"2022-05-09T21:58:58.756","isRead":false,"type":"TALK"}
            //     //     if (messageFromServer.type === "TALK") {
            //     //       // dispatch(addMessage(messageFromServer));
            //     //     } else if (messageFromServer.type === "FULL") {
            //     //       // dispatch(changeRoomtype('FULL'));
            //     //     }
          },
          { Authorization: `Bearer ${localStorage.getItem("token")}` }
        );
        // const data = {
        //   roomId: roomId,
        //   type: "IN",
        // };
        // stompClient.send(
        //   `/pub/chat/connect-status`,
        //   { Authorization: `Bearer ${localStorage.getItem("token")}` },
        //   JSON.stringify(data)
        // );
      }
    );
  };
  const socketDisconnect = () => {
    if (stompClient) stompClient.disconnect();
  };
  const sendMessage = (event) => {
    event.preventDefault();
    if (event.target.chat.value === "") return false;

    const chatData = {
      roomId: roomId,
      message: event.target.chat.value,
      isRead: false,
      type: "TALK",
    };

    stompClient.send(
      `/pub/chat/message`,
      { Authorization: `Bearer ${localStorage.getItem("token")}` },
      JSON.stringify(chatData)
    );

    const data = {
      id: Math.random(),
      senderId: user.id,
      date: "12:12",
      message: event.target.chat.value,
      nickname: user.nickname,
    };

    dispatch(addMessage(data));

    event.target.chat.value = null;
  };

  useEffect(() => {
    if (stompClient.current) {
      console.log(stompClient);
      socketDisconnect();
    }
    socketConnect();
    return () => {
      socketDisconnect();
    };
  }, [roomId]);

  return (
    <div>
      <ChatList roomId={roomId} />
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
