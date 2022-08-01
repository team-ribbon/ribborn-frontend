import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis as chatApi } from "../../shared/api";

const GET_ROOM_LIST = "GET_ROOM_LIST";
const GET_MESSAGE_LIST = "GET_MESSAGE_LIST";
const ADD_MESSAGE = "ADD_MESSAGE";
const UPDATE_ROOM_MESSAGE = "UPDATE_ROOM_MESSAGE";
const CLEAN_UP_MESSAGE = "CLEAN_UP_MESSAGE";
const SET_NOTIFICATION = "SET_NOTIFICATION";

const getRoomList = createAction(GET_ROOM_LIST, (roomList) => ({ roomList }));
const getMessageList = createAction(GET_MESSAGE_LIST, (messageList) => ({
  messageList,
}));
export const addMessage = createAction(ADD_MESSAGE, (messageObj) => ({
  messageObj,
}));
export const updateRoomMessage = createAction(
  UPDATE_ROOM_MESSAGE,
  (messageObj) => ({
    messageObj,
  })
);
export const cleanUpMessage = createAction(CLEAN_UP_MESSAGE, () => ({}));
export const setNotification = createAction(
  SET_NOTIFICATION,
  (notification) => ({
    notification,
  })
);

const initialState = {
  roomList: [],
  messageList: [],
  notification: false,
};

// 채팅 페이지에서 채팅 리스트 데이터 받아오기
export const getRoomListDB = () => {
  return async (dispatch) => {
    const response = await chatApi.getRoomList();
    dispatch(getRoomList(response.data));
  };
};

// 채팅방에서 채팅 내역 받아오기
export const getMessageListDB = (roomId) => {
  return async (dispatch) => {
    const response = await chatApi.getMessageList(roomId);
    dispatch(getMessageList(response.data));
  };
};

//채팅방 나가기
const exitChatDB = (roomId) => {
  return function (dispatch, getState, { history }) {
    chatApi
      .exitChat(roomId)
      .then((res) => {
        history.push(`/chat`);
      })
      .catch((error) => {
        // console.log(error);
      });
  };
};

export default handleActions(
  {
    [GET_ROOM_LIST]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.roomList = payload.roomList;
      }),
    [GET_MESSAGE_LIST]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.messageList = payload.messageList;
      }),
    [ADD_MESSAGE]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.messageList.push(payload.messageObj);
      }),
    [UPDATE_ROOM_MESSAGE]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.roomList[payload.messageObj.index].message =
          payload.messageObj.message;
        draft.roomList[payload.messageObj.index].date = payload.messageObj.date;
      }),
    [CLEAN_UP_MESSAGE]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.messageList = initialState.messageList;
      }),
    [SET_NOTIFICATION]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.notification = payload.notification;
      }),
  },
  initialState
);
