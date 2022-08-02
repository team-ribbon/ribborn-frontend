import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import styled from "styled-components";
import moment from "moment";

// 채팅 > 채팅방 목록
const ChatRoomList = ({ location, roomId }) => {
  const roomList = useSelector((state) => state.chat.roomList);
  const userId = useSelector((state) => state.user.user.id);

  return (
    <>
      {roomList.map((room, index) => {
        const isExit = room.type === "STATUS" && +room.senderName === +userId;
        return (
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
              <Date>{!isExit && moment(room.date).format("HH:mm")}</Date>
              <Message>
                {isExit ? "채팅 내역이 없습니다." : room?.message}
              </Message>
            </List>
          </Link>
        );
      })}
      {roomList.length < 1 && <List>진행 중인 채팅이 없습니다.</List>}
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
