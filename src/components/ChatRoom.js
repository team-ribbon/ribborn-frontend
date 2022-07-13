import SockJS from "sockjs-client";
import Stomp from "stompjs";

import { useSelector } from "react-redux";
import styled from "styled-components";
import { useEffect } from "react";

const ChatRoom = ({ isRoom }) => {
  const chatLog = useSelector((state) => state.chat.chatLog);
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    // 연결 및 구독
    // const sockjs = new SockJS("url");
    // const socket = Stomp.over(sockjs);
    // const connect = () => {
    //   try {
    //     socket.connect({ Authorization: localStorage.get("token") }, () => {
    //       socket.subscribe("url");
    //     });
    //   } catch (error) {
    //     alert("에러");
    //     console.log(error);
    //   }
    // };
    // 연결 해제
  }, []);

  // /ws-stomp
  // /pub/chat/connect-status
  // http://13.125.117.133:8888

  const socketConnect = () => {
    let sock = new SockJS("http://13.125.117.133:8888/ws-stomp");
    let client = Stomp.over(sock);
    client.connect(
      { Authorization: `${localStorage.getItem("token")}` },
      () => {
        console.log("connected");
        // console.log(client.ws.readyState);
        client.subscribe(
          `/sub/chat/room/${isRoom}`,
          function (messagefs) {
            const messageFromServer = JSON.parse(messagefs.body);
            // {"messageId":21,"senderId":2,"message":"fffff","date":"2022-05-09T21:58:58.756","isRead":false,"type":"TALK"}
            if (messageFromServer.type === "TALK") {
              // dispatch(addMessage(messageFromServer));
            } else if (messageFromServer.type === "FULL") {
              // dispatch(changeRoomtype('FULL'));
            }
          },
          { Authorization: localStorage.getItem("token") }
        );
      }
    );
  };

  useEffect(() => {
    // client.connect(
    //   { Authorization: `${localStorage.getItem("token")}` },
    //   function () {
    //     console.log("connected");
    //     console.log(client.ws.readyState);
    // client.subscribe(
    //   `/sub/chat/room/${isRoom}`,
    //   function (messagefs) {
    //     const messageFromServer = JSON.parse(messagefs.body);
    //     // {"messageId":21,"senderId":2,"message":"fffff","date":"2022-05-09T21:58:58.756","isRead":false,"type":"TALK"}
    //     if (messageFromServer.type === "TALK") {
    //       // dispatch(addMessage(messageFromServer));
    //     } else if (messageFromServer.type === "FULL") {
    //       // dispatch(changeRoomtype('FULL'));
    //     }
    //   },
    //   { Authorization: localStorage.getItem("token") }
    // );
    // const data = {
    //   roomId: isRoom,
    //   type: "IN",
    // };
    // client.send(
    //   `/pub/chat/connect-status`,
    //   { Authorization: `${localStorage.getItem("token")}` },
    //   JSON.stringify(data)
    // );
    // //   window.alert('room in')
    // console.log("send room in");
    // console.log(client.ws.readyState);
    // }
    // );
    socketConnect();
    // sock.onclose = function () {
    setTimeout(() => socketConnect(), 5000);
    // };
    return () => {
      // const data = {
      //   roomId: isRoom,
      //   type: "OUT",
      // };
      // client.send(
      //   `/pub/chat/connect-status`,
      //   { Authorization: `${localStorage.getItem("token")}` },
      //   JSON.stringify(data)
      // );
      // client.disconnect(
      //   () => {
      //     client.unsubscribe("sub-0");
      //   },
      //   { Authorization: `${localStorage.getItem("token")}` }
      // );
      // dispatch(getPreviousMessages([]));
      //방퇴장할때 OUT 했다는 메시지 Send
    };
  }, []);

  return (
    <div>
      <MessageWrap>
        {chatLog.map((chat) => {
          return chat.senderId === user.id ? (
            <Me>
              <Nickname>{chat.nickname}</Nickname>
              <Date>{chat.date}</Date>
              <Message>{chat.message}</Message>
            </Me>
          ) : (
            <You>
              <Nickname>{chat.nickname}</Nickname>
              <Date>{chat.date}</Date>
              <Message>{chat.message}</Message>
            </You>
          );
        })}
      </MessageWrap>

      <ChatInput>
        <input />
        <button>보내기</button>
      </ChatInput>
    </div>
  );
};

const ChatInput = styled.div``;

const MessageWrap = styled.div`
  display: flex;
  flex-flow: column;
  gap: 20px;
`;

const Me = styled.div`
  align-self: flex-end;
`;
const You = styled.div``;

const Nickname = styled.div``;
const Date = styled.div``;
const Message = styled.div`
  width: fit-content;
  background-color: palegoldenrod;
`;

export default ChatRoom;
