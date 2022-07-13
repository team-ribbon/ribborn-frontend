import { useSelector } from "react-redux";
import styled from "styled-components";
import ChatRoom from "./ChatRoom";

const ChatModal = ({ setChatToggle }) => {
  const roomList = useSelector((state) => state.chat.roomList);
  return (
    <Wrap>
      <ListWrap>
        {roomList.map((room) => (
          <List key={room.roomId}>
            <span>{room.nickname}</span>
            <span>{room.chat}</span>
            <span>{room.time}</span>
          </List>
        ))}
      </ListWrap>
      <RoomWrap>
        <CloseBtn onClick={() => setChatToggle((prev) => !prev)}>X</CloseBtn>
        <ChatRoom />
      </RoomWrap>
    </Wrap>
  );
};

const Wrap = styled.div`
  position: fixed;
  top: 10%;
  left: 10%;
  width: 600px;
  height: 500px;
  background-color: #fff;
  display: flex;
`;
const ListWrap = styled.div`
  background-color: cornflowerblue;
  width: 33%;
`;
const List = styled.div``;
const RoomWrap = styled.div`
  position: relative;
  background-color: lavenderblush;
  width: 67%;
  display: flex;
  flex-direction: column-reverse;
`;
const CloseBtn = styled.button`
  position: absolute;
  right: 0;
  top: 0;
`;

export default ChatModal;
