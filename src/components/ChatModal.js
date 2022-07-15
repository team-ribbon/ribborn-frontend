import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { OrangeChatSVG } from "../elements/SVG";
import { getRoomListDB } from "../redux/modules/chat";
import ChatRoom from "./ChatRoom";

const ChatModal = ({ setChatToggle }) => {
  const dispatch = useDispatch();
  const match = useMatch("/chat");
  const location = useLocation();
  const navigate = useNavigate();
  const roomList = useSelector((state) => state.chat.roomList);
  const roomId = location.pathname.split("/")[2];

  const onClickClose = () => {
    setChatToggle((prev) => !prev);
    navigate(location.state.backgroundLocation);
  };

  useEffect(() => {
    // dispatch(getRoomListDB());
  }, []);
  useEffect(() => {
    if (!(location.pathname.split("/")[1] === "chat")) {
      setChatToggle(false);
    }
  }, [location, setChatToggle]);

  useEffect(() => {
    document.body.style.cssText = `
        position: fixed;
        top: -${window.scrollY}px;
        overflow-y: scroll;
        width: 100%;`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = "";
      window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
    };
  }, []);

  return (
    <>
      <Dim />
      <Wrap>
        <ListWrap>
          <Title>채팅</Title>
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
          <CloseBtn onClick={onClickClose}>
            <svg
              width="17"
              height="17"
              viewBox="0 0 17 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M16 1L1 16M16 16L1 1" stroke="#222222" />
            </svg>
          </CloseBtn>
          {match && (
            <HelpMessage>
              <div>
                <OrangeChatSVG />
              </div>
              {roomList.length > 0 ? (
                <>
                  왼쪽 채팅 목록을 클릭하여 <br />
                  채팅 내용을 확인해주세요!
                </>
              ) : (
                "채팅 내역이 없습니다."
              )}
            </HelpMessage>
          )}
          {roomId && <ChatRoom roomId={roomId} />}
        </RoomWrap>
      </Wrap>
    </>
  );
};
const Dim = styled.div`
  box-sizing: border-box;
  display: "block";
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.6);
`;
const Wrap = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  min-width: 468px;
  min-height: 400px;
  width: 75%;
  height: 82%;
  max-width: 1360px;
  max-height: 1160px;
  transform: translate(-50%, -50%);
  background-color: #fff;
  display: flex;
  border-radius: 24px;
`;
const Title = styled.div`
  margin: 30px;
  font-weight: 700;
  font-size: ${({ theme }) => theme.fontSizes.xl};
`;
const ListWrap = styled.div`
  width: 33%;
  height: fit-content;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray};
`;
const List = styled.div`
  display: flex;
  flex-flow: wrap;
  justify-content: space-between;
  gap: 20px;
  padding: 30px;
  border-top: 1px solid ${({ theme }) => theme.colors.gray};
`;
const Nickname = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.l};
  font-weight: 700;
`;
const Date = styled.div`
  color: ${({ theme }) => theme.colors.gray};
`;
const Message = styled.div`
  width: 100%;
  color: ${({ theme }) => theme.colors.gray};
`;
const RoomWrap = styled.div`
  position: relative;
  width: 67%;
  display: flex;
  flex-direction: column-reverse;
  border-left: 1px solid ${({ theme }) => theme.colors.gray};
`;
const CloseBtn = styled.div`
  position: absolute;
  right: 30px;
  top: 30px;
  cursor: pointer;
`;
const HelpMessage = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  text-align: center;
  padding-bottom: 50%;
`;

export default ChatModal;
