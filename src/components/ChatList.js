import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { getMessageListDB } from "../redux/modules/chat";
const ChatList = ({ roomId }) => {
  const chatList = useSelector((state) => state.chat.chatList);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(user, roomId);
    dispatch(getMessageListDB(roomId));
  }, []);

  return (
    <MessageWrap>
      {chatList.map((chat) => {
        return chat.senderId === user.id ? (
          <Me key={chat.id}>
            <NickAndDate>
              <Date>{chat.date}</Date>
              <Nickname>{chat.nickname}</Nickname>
            </NickAndDate>
            <Message me>{chat.message}</Message>
          </Me>
        ) : (
          <You key={chat.id}>
            <Nickname>{chat.nickname}</Nickname>
            <Date>{chat.date}</Date>
            <Message>{chat.message}</Message>
          </You>
        );
      })}
    </MessageWrap>
  );
};

const MessageWrap = styled.div`
  display: flex;
  flex-flow: column;
  gap: 20px;
  padding: 30px 30px 0 30px;
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
  justify-content: end;
  align-items: center;
  margin-bottom: 10px;
`;
const Nickname = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.l};
`;
const Date = styled.span`
  color: ${({ theme }) => theme.colors.gray};
`;
const Message = styled.div`
  width: fit-content;
  background-color: #f2f2f2;
  border-radius: ${({ me }) => (me ? "15px 0 15px 15px" : "0 15px 15px 15px")};
  padding: 20px 30px;
`;

export default ChatList;
