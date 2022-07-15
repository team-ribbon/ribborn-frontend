import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis as chatApi } from "../../shared/api";

const GET_CHAT_LIST = "GET_CHAT_LIST";
const GET_MSG_LIST = "GET_MSG_LIST";
const GET_ROOMID = "GET_ROOMID";
const ADD_MESSAGE = "ADD_MESSAGE";
const GET_CHAT_USER = "GET_CHAT_USER";

const getChatList = createAction(GET_CHAT_LIST, (chatList) => ({ chatList }));
const getMessageList = createAction(GET_MSG_LIST, (messageList) => ({
  messageList,
}));
export const addMessage = createAction(ADD_MESSAGE, (messageObj) => ({
  messageObj,
}));
const getRoomId = createAction(GET_ROOMID, (id) => ({ id }));
const getChatUser = createAction(GET_CHAT_USER, (user) => ({ user }));

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
      roomId: 3,
      message: "가장최근채팅3",
      nickname: "이것은닉네임3",
      date: "12:12",
    },
  ],
  chatList: [],
};

// 채팅 페이지에서 채팅 리스트 데이터 받아오기
export const getRoomListDB = () => {
  return async (dispatch) => {
    const response = await chatApi.getRoomList();
    console.log("get room :", response);
  };
};

// 채팅방에서 채팅 내역 받아오기
export const getMessageListDB = (roomId) => {
  return async (dispatch) => {
    const response = await chatApi.getMessageList(roomId);
    console.log("get chat :", response);
  };
};

//채팅방 번호 받아오기
const getRoomIdDB = (roomId) => {
  return function (dispatch, getState, { history }) {
    chatApi
      .roomIdDB(roomId)
      .then((res) => {
        // console.log(res.data);
        history.push(`/chatdetail/${res.data.chatRoomId}`);
      })
      .catch((error) => {
        // console.log(error);
      });
  };
};

//채팅방에 속해있는 유저정보 불러오기
const getChatUserDB = (roomId) => {
  return function (dispatch, getState, { history }) {
    chatApi
      .chatUser(roomId)
      .then((res) => {
        dispatch(getChatUser(res.data));
      })
      .catch((error) => {
        // console.log(error);
      });
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
    [GET_CHAT_LIST]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.chatList = payload.chatList;
      }),
    [GET_MSG_LIST]: (state, action) =>
      produce(state, (draft) => {
        // draft.msg.push(...action.payload.msg);
        draft.msg = action.payload.msg;
      }),
    [GET_ROOMID]: (state, action) =>
      produce(state, (draft) => {
        draft.id = action.payload.id;
      }),
    [ADD_MESSAGE]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.chatList.push(payload.messageObj);
      }),
    [GET_CHAT_USER]: (state, action) =>
      produce(state, (draft) => {
        draft.user = action.payload.user;
      }),
  },
  initialState
);
