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
              <span>
                <Nickname>{room?.nickname}</Nickname>
                <Date>{!isExit && moment(room.date).format("HH:mm")}</Date>
              </span>
              <span>
                <Message>
                  {isExit ? "채팅 내역이 없습니다." : room?.message}
                </Message>
                {room?.unreadCnt > 0 && <NotiCount>{room.unreadCnt}</NotiCount>}
              </span>
            </List>
          </Link>
        );
      })}
      {roomList.length < 1 && <List>진행 중인 채팅이 없습니다.</List>}
    </>
  );
};
const List = styled.div`
  padding: 30px;
  color: ${({ selected }) => selected && "#fff"};
  background-color: ${({ selected, theme }) => selected && theme.colors.black};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray};
  span {
    display: flex;
    gap: 5px;
    justify-content: space-between;
    align-items: center;
  }
`;
const Nickname = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.l};
  font-weight: 700;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 20px;
`;
const Date = styled.div`
  margin-bottom: 20px;
  color: ${({ theme }) => theme.colors.gray};
`;
const Message = styled.div`
  width: 100%;
  line-height: 21px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${({ theme }) => theme.colors.gray};
`;
const NotiCount = styled.div`
  width: fit-content;
  color: #fff;
  padding: 5px 8px 4px 8px;
  border-radius: 30px;
  font-weight: 700;
  background-color: ${({ theme }) => theme.colors.orange};
  font-size: ${({ theme }) => theme.fontSizes.s};
`;
export default ChatRoomList;
