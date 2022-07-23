import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import styled from "styled-components";
import moment from "moment";

const ChatRoomList = ({ location, roomId, setIsEmpty }) => {
  const roomList = useSelector((state) => state.chat.roomList);

  if (roomList.length === 0) {
    setIsEmpty(true);
  } else {
    setIsEmpty(false);
  }

  return (
    <>
      {roomList.map((room, index) => (
        <Link
          to={`/chat/${room.roomId}`}
          key={room.roomId}
          state={{
            backgroundLocation: location.state.backgroundLocation,
            index: index,
          }}
        >
          <List selected={+room.roomId === +roomId}>
            <Nickname>{room?.nickname}</Nickname>
            <Date>{moment(room.date).format("HH:mm")}</Date>
            <Message>{room?.message}</Message>
          </List>
        </Link>
      ))}
    </>
  );
};
const List = styled.div`
  display: flex;
  flex-flow: wrap;
  justify-content: space-between;
  gap: 20px;
  padding: 30px;
  color: ${({ selected }) => selected && "#fff"};
  background-color: ${({ selected, theme }) => selected && theme.colors.black};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray};
`;
const Nickname = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.l};
  font-weight: 700;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const Date = styled.div`
  color: ${({ theme }) => theme.colors.gray};
`;
const Message = styled.div`
  width: 100%;
  color: ${({ theme }) => theme.colors.gray};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
export default ChatRoomList;
