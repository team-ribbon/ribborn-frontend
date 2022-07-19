import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Link,
  useLocation,
  useMatch,
  useNavigate,
  useParams,
} from "react-router-dom";
import styled from "styled-components";

import { getRoomListDB } from "../redux/modules/chat";
import ChatRoom from "./ChatRoom";

import { OrangeChatSVG, XSVG } from "../elements/SVG";

// 채팅 모달
const ChatModal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isMatchChat = useMatch("/chat");
  const { roomId } = useParams();

  const roomList = useSelector((state) => state.chat.roomList);

  const onClickClose = () => {
    navigate(location.state.backgroundLocation);
  };

  useEffect(() => {
    dispatch(getRoomListDB());
  }, [dispatch]);

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
    <FloatWrap>
      <Dim />
      <Wrap>
        <LeftWrap>
          <Title>채팅</Title>
          <ListWrap>
            {roomList.map((room) => (
              <Link
                to={`/chat/${room.roomId}`}
                key={room.roomId}
                state={{
                  backgroundLocation: location.state.backgroundLocation,
                }}
              >
                <List selected={+room.roomId === +roomId}>
                  <Nickname>{room?.nickname}</Nickname>
                  <Date>{room?.date}</Date>
                  <Message>{room?.message}</Message>
                </List>
              </Link>
            ))}
          </ListWrap>
        </LeftWrap>
        <RoomWrap>
          <CloseBtn onClick={onClickClose}>
            <XSVG />
          </CloseBtn>
          {isMatchChat && (
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
    </FloatWrap>
  );
};
const FloatWrap = styled.div`
  z-index: 99;
  position: fixed;
  bottom: 30px;
  right: 30px;
`;
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
const LeftWrap = styled.div`
  width: 33%;
`;
const ListWrap = styled.div`
  height: 80%;
  overflow-y: auto;
  border-top: 1px solid ${({ theme }) => theme.colors.gray};
`;
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
  line-height: 1.2;
  margin: auto 0;
`;

export default ChatModal;
