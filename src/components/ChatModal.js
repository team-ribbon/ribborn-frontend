import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  useLocation,
  useMatch,
  useNavigate,
  useParams,
} from "react-router-dom";
import styled from "styled-components";

import { getRoomListDB } from "../redux/modules/chat";
import ChatRoom from "./ChatRoom";

import { OrangeChatSVG, XSVG } from "../elements/SVG";
import ChatRoomList from "./ChatRoomList";

// 채팅 모달
const ChatModal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isMatchChat = useMatch("/chat");
  const { roomId } = useParams();
  const [isEmpty, setIsEmpty] = useState(false);

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
            <ChatRoomList
              location={location}
              roomId={roomId}
              setIsEmpty={setIsEmpty}
            />
          </ListWrap>
        </LeftWrap>
        <RoomWrap>
          {isMatchChat && (
            <HelpMessage>
              <div>
                <OrangeChatSVG />
              </div>
              {isEmpty ? (
                <>채팅 내역이 없습니다.</>
              ) : (
                <>
                  왼쪽 채팅 목록을 클릭하여 <br />
                  채팅 내용을 확인해주세요!
                </>
              )}
            </HelpMessage>
          )}
          {roomId && <ChatRoom roomId={roomId} />}
          <CloseBtn>
            <div onClick={onClickClose}>
              <XSVG />
            </div>
          </CloseBtn>
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
const RoomWrap = styled.div`
  padding-top: 45px;
  width: 67%;
  display: flex;
  flex-direction: column-reverse;
  border-left: 1px solid ${({ theme }) => theme.colors.gray};
  position: relative;
`;
const CloseBtn = styled.div`
  background-color: #fff;
  width: 99%;
  display: flex;
  flex-direction: row-reverse;
  position: absolute;
  padding: 20px 20px 5px 0;
  border-radius: 0 30px 0 0;
  top: 0;
  div {
    cursor: pointer;
  }
`;
const HelpMessage = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  text-align: center;
  line-height: 1.2;
  margin: auto 0;
`;

export default ChatModal;
