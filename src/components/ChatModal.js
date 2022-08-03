import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  useLocation,
  useMatch,
  useNavigate,
  useParams,
} from "react-router-dom";
import styled from "styled-components";

import { setNotification, getRoomListDB } from "../redux/modules/chat";
import ChatRoom from "./ChatRoom";
import ChatRoomList from "./ChatRoomList";

import { OrangeChatSVG, XSVG } from "../elements/SVG";

// 채팅 모달
const ChatModal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isMatchChat = useMatch("/chat");
  const { roomId } = useParams();

  const onClickClose = () => {
    navigate(location.state.backgroundLocation);
  };

  const onClickBack = () => {
    navigate("/chat", {
      state: { backgroundLocation: location.state.backgroundLocation },
    });
  };

  useEffect(() => {
    dispatch(getRoomListDB());
  }, [roomId, dispatch]);

  useEffect(() => {
    return () => {
      dispatch(setNotification(false));
    };
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
        <LeftWrap isRoom={roomId}>
          <Title>
            채팅
            <span onClick={onClickClose}>
              <XSVG />
            </span>
          </Title>
          <ListWrap>
            <ChatRoomList location={location} roomId={roomId} />
          </ListWrap>
        </LeftWrap>
        <RoomWrap isRoom={roomId}>
          {isMatchChat && (
            <HelpMessage>
              <div>
                <OrangeChatSVG />
              </div>
              <>
                왼쪽 채팅 목록을 클릭하여 <br />
                채팅 내용을 확인해주세요!
              </>
            </HelpMessage>
          )}
          {roomId && <ChatRoom roomId={roomId} />}
          <Header isRoom={roomId}>
            <span onClick={onClickClose}>
              <XSVG />
            </span>
            {roomId && <div onClick={onClickBack}>{"<"}</div>}
          </Header>
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
  width: 75%;
  height: 82%;
  max-width: 1360px;
  max-height: 1160px;
  transform: translate(-50%, -50%);
  background-color: #fff;
  display: flex;
  border-radius: 24px;
  @media screen and (max-width: 768px) {
    width: 100%;
    height: 100%;
    border-radius: 0;
  }
`;
const Title = styled.div`
  margin: 30px;
  font-weight: 700;
  font-size: ${({ theme }) => theme.fontSizes.xl};
  display: flex;
  justify-content: space-between;
  span {
    cursor: pointer;
    @media screen and (min-width: 768px) {
      display: none;
    }
  }
`;
const LeftWrap = styled.div`
  width: 33%;
  @media screen and (max-width: 768px) {
    display: ${({ isRoom }) => isRoom && "none"};
    width: ${({ isRoom }) => !isRoom && "100%"};
  }
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
  @media screen and (max-width: 768px) {
    display: ${({ isRoom }) => !isRoom && "none"};
    width: ${({ isRoom }) => isRoom && "100%"};
  }
`;
const Header = styled.div`
  background-color: #fff;
  width: 100%;
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  position: absolute;
  padding: 20px 20px 15px 0;
  border-radius: 30px 30px 0 0;
  top: 0;
  @media screen and (max-width: 768px) {
    padding: 20px 20px 5px 0;
  }
  span {
    cursor: pointer;
    padding-top: 5px;
  }
  div {
    cursor: pointer;
    font-size: 35px;
    font-weight: 100;
    padding-left: 20px;
    @media screen and (min-width: 768px) {
      display: none;
    }
  }
`;
const HelpMessage = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  text-align: center;
  line-height: 1.2;
  margin: auto 0;
`;

export default ChatModal;
