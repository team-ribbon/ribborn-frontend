import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { cleanUpMessage, getMessageListDB } from "../redux/modules/chat";
import moment from "moment";

// 채팅 모달 > 채팅방 > 채팅 내역
const ChatList = () => {
  const dispatch = useDispatch();
  const { roomId } = useParams();
  const scrollRef = useRef();
  const messageList = useSelector((state) => state.chat.messageList);
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    dispatch(cleanUpMessage());
    dispatch(getMessageListDB(roomId));
  }, [roomId]);

  useEffect(() => {
    scrollRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messageList]);

  return (
    <MessageWrap>
      {messageList.map((chat, index) => {
        const date = moment(chat.date).format("hh:mm");
        return chat?.senderName === user?.username ? (
          <>
            {chat.date.split("T")[0] !==
              messageList[index - 1]?.date?.split("T")[0] && (
              <ChatListDate>
                {moment(chat.date).format("YYYY.MM.DD")}
              </ChatListDate>
            )}
            <Me key={chat.date}>
              <NickAndDate me>
                <Date me>{date}</Date>
                <Nickname>{chat?.nickname}</Nickname>
              </NickAndDate>
              <Message me>{chat?.message}</Message>
            </Me>
          </>
        ) : (
          <>
            {chat.date.split("T")[0] !==
              messageList[index - 1]?.date?.split("T")[0] && (
              <ChatListDate>
                {moment(chat.date).format("YYYY.MM.DD")}
              </ChatListDate>
            )}
            <You key={chat.date}>
              <NickAndDate>
                <Nickname>{chat?.nickname}</Nickname>
                <Date you>{date}</Date>
              </NickAndDate>
              <Message>{chat?.message}</Message>
            </You>
          </>
        );
      })}
      <div ref={scrollRef} />
    </MessageWrap>
  );
};

const MessageWrap = styled.div`
  display: flex;
  flex-flow: column;
  gap: 20px;
  padding: 30px 30px 0 30px;
  overflow-y: auto;
  height: 58vh;
`;

const Me = styled.div`
  align-self: flex-end;
  margin-left: 10%;
`;
const You = styled.div`
  margin-right: 10%;
`;
const NickAndDate = styled.div`
  display: flex;
  justify-content: ${({ me }) => (me ? "end" : "start")};
  align-items: center;
  margin-bottom: 10px;
`;
const Nickname = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.l};
`;
const Date = styled.span`
  color: ${({ theme }) => theme.colors.gray};
  margin-right: ${({ me }) => me && "20px"};
  margin-left: ${({ you }) => you && "20px"};
`;
const Message = styled.div`
  width: fit-content;
  background-color: #f2f2f2;
  border-radius: ${({ me }) => (me ? "15px 0 15px 15px" : "0 15px 15px 15px")};
  padding: 20px 30px;
`;
const ChatListDate = styled.div`
  text-align: center;
  margin: 30px 0;
  font-size: ${({ theme }) => theme.fontSizes.l};
`;

export default ChatList;
