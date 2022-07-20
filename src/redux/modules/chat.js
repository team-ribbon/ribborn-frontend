import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis as chatApi } from "../../shared/api";

const GET_ROOM_LIST = "GET_ROOM_LIST";
const GET_MESSAGE_LIST = "GET_MESSAGE_LIST";
const ADD_MESSAGE = "ADD_MESSAGE";
const CLEAN_UP_MESSAGE = "CLEAN_UP_MESSAGE";

const getRoomList = createAction(GET_ROOM_LIST, (roomList) => ({ roomList }));
const getMessageList = createAction(GET_MESSAGE_LIST, (messageList) => ({
  messageList,
}));
export const addMessage = createAction(ADD_MESSAGE, (messageObj) => ({
  messageObj,
}));
export const cleanUpMessage = createAction(CLEAN_UP_MESSAGE, () => ({}));

const initialState = {
  roomList: [
    {
      roomId: 1,
      message: "가장최근채팅1",
      nickname: "이것은닉네임1",
      date: "12:12",
    },
    {
      roomId: 2,
      message: "가장최근채팅2",
      nickname: "이것은닉네임2",
      date: "12:12",
    },
    {
      roomId: 6,
      message: "가장최근채팅3",
      nickname: "이것은닉네임3",
      date: "12:12",
    },
  ],
  messageList: [],
};

// 채팅 페이지에서 채팅 리스트 데이터 받아오기
export const getRoomListDB = () => {
  return async (dispatch) => {
    const response = await chatApi.getRoomList();
    console.log("get room :", response.data);
    // dispatch(getRoomList(response.data));
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
    [CLEAN_UP_MESSAGE]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.messageList = initialState.messageList;
      }),
  },
  initialState
);
