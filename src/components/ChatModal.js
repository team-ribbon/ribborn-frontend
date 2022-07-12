import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";
import ChatRoom from "./ChatRoom";

const ChatModal = ({ setChatToggle }) => {
  const match = useMatch("/chat");
  const location = useLocation();
  const navigate = useNavigate();
  const roomList = useSelector((state) => state.chat.roomList);
  const isRoom = location.pathname.split("/")[2];

  const onClickClose = () => {
    setChatToggle((prev) => !prev);
    navigate(location.state.backgroundLocation);
  };

  useEffect(() => {
    if (!(location.pathname.split("/")[1] === "chat")) {
      setChatToggle(false);
    }
  }, [location, setChatToggle]);

  return (
    <Wrap>
      <ListWrap>
        {roomList.map((room) => (
          <Link
            to={"/chat/" + room.roomId}
            key={room.roomId}
            state={{ backgroundLocation: location.state.backgroundLocation }}
          >
            <List>
              <Nickname>{room.nickname}</Nickname>
              <Date>{room.date}</Date>
              <Message>{room.message}</Message>
            </List>
          </Link>
        ))}
      </ListWrap>
      <RoomWrap>
        <CloseBtn onClick={onClickClose}>X</CloseBtn>
        {match &&
          (roomList.length > 0
            ? "왼쪽 채팅 목록을 클릭하여 채팅 내용을 확인해주세요!"
            : "채팅 내역이 없어요!")}
        {isRoom && <ChatRoom isRoom={isRoom} />}
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
  background-color: lightgray;
  width: 33%;
`;
const List = styled.div`
  display: flex;
  flex-flow: wrap;
  justify-content: space-between;
  gap: 5px;
  border-bottom: 1px solid black;
`;
const Nickname = styled.div``;
const Date = styled.div``;
const Message = styled.div`
  width: 100%;
`;
const RoomWrap = styled.div`
  position: relative;
  background-color: whitesmoke;
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
