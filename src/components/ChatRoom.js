import SockJS from "sockjs-client";
import Stomp from "stompjs";

import { useSelector } from "react-redux";
import styled from "styled-components";
import { useEffect, useRef } from "react";

const ChatRoom = ({ roomId }) => {
  const chatLog = useSelector((state) => state.chat.chatLog);
  const user = useSelector((state) => state.user.user);

  let currentRoomId = useRef();
  let stompClient = useRef(null);

  console.log("roomId :", roomId);

  // /ws-stomp
  // http://13.125.117.133:8888

  const socketConnect = () => {
    const webSocket = new SockJS("http://13.125.117.133:8888/ws-stomp");
    stompClient = Stomp.over(webSocket);
    stompClient.connect(
      {
        Authorization: localStorage.getItem("token"),
        // , type: "IN"
      },
      (frame) => {
        console.log("연결 성공~!~!~!🕺 💃");
        console.log("frame", frame);
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
          }
          // { Authorization: localStorage.getItem("token") }
        );
        stompClient.send(
          `/pub/chat/connect-status`,
          { Authorization: localStorage.getItem("token") },
          JSON.stringify("채팅이라네")
        );
      }
    );
  };
  const socketDisconnect = () => {
    if (stompClient) stompClient.disconnect();
  };
  const sendMessage = () => {
    stompClient.send();
  };

  useEffect(() => {
    // let sock = new SockJS("http://13.125.117.133:8888/ws-stomp");
    // let client = Stomp.over(sock);
    // client.connect(
    //   { Authorization: `${localStorage.getItem("token")}` },
    //   function (frame) {
    //     console.log("connected");
    //     console.log(client.ws.readyState);
    //     console.log(frame);
    //   }
    // );

    // client.subscribe(
    //   `/sub/chat/room/${isRoom}`,
    //   function (messagefs) {
    //     const messageFromServer = JSON.parse(messagefs.body);
    //     //     // {"messageId":21,"senderId":2,"message":"fffff","date":"2022-05-09T21:58:58.756","isRead":false,"type":"TALK"}
    //     //     if (messageFromServer.type === "TALK") {
    //     //       // dispatch(addMessage(messageFromServer));
    //     //     } else if (messageFromServer.type === "FULL") {
    //     //       // dispatch(changeRoomtype('FULL'));
    //     //     }
    //   },
    //   { Authorization: localStorage.getItem("token") }
    // )

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
    // setTimeout(() => socketConnect(), 5000);
    // };
    return () => {
      socketDisconnect();
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
  }, [roomId]);

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
