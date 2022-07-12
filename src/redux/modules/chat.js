import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis as chatApi } from "../../shared/api";

const GET_CHAT_LIST = "GET_CHAT_LIST";
const GET_MSG_LIST = "GET_MSG_LIST";
const GET_ROOMID = "GET_ROOMID";
const SUB_MSG = "SUB_MSG";
const GET_CHAT_USER = "GET_CHAT_USER";

const getChatList = createAction(GET_CHAT_LIST, (list) => ({ list }));
const getMsgList = createAction(GET_MSG_LIST, (msg) => ({ msg }));
const getRoomId = createAction(GET_ROOMID, (id) => ({ id }));
const subMsg = createAction(SUB_MSG, (sub) => ({ sub }));
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
  chatLog: [
    {
      messageId: 1,
      senderId: 1,
      nickname: "내닉내임",
      message: "안녕하세요 나는 나",
      date: "12:12",
    },
    {
      messageId: 2,
      senderId: 2,
      nickname: "상대방닉네임",
      message: "안녕하세요 나는 상대방",
      date: "12:12",
    },
  ],
};

// 채팅 페이지에서 채팅 리스트 데이터 받아오기
const getChatListDB = () => {
  return function (dispatch, getState, { history }) {
    chatApi
      .chatList()
      .then((res) => {
        // console.log(res.data);
        // console.log("성공");
        dispatch(getChatList(res.data));
      })
      .catch((error) => {
        // console.log(error);
      });
  };
};
// // 채팅 페이지에서 채팅 리스트 데이터 받아오기
// const getChatListDB = () => {
//   return function (dispatch, getState, { history }) {
//     const token = sessionStorage.getItem("token");
//     axios
//       .get(`http://3.38.180.96/chatroom/get`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "content-type": "application/json;charset=UTF-8",
//           accept: "application/json,",
//         },
//       })
//       .then((res) => {
//         console.log(res.data);
//         dispatch(getChatList(res.data));
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };
// };

//과거에 나눴던 채팅들 받아오기
const getMsgListDB = (chatRoomId) => {
  return function (dispatch, getState, { history }) {
    chatApi
      .msgList(chatRoomId)
      .then((res) => {
        // console.log(res.data);
        dispatch(getMsgList(res.data));
      })
      .catch((error) => {
        // console.log(error);
      });
  };
};
// //과거에 나눴던 채팅들 받아오기
// const getMsgListDB = (chatRoomId) => {
//   return function (dispatch, getState, { history }) {
//     const token = sessionStorage.getItem("token");
//     axios
//       .get(`http://3.38.180.96/chatroom/get/${chatRoomId}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "content-type": "application/json;charset=UTF-8",
//           accept: "application/json,",
//         },
//       })
//       .then((res) => {
//         console.log(res.data);
//         dispatch(getMsgList(res.data));
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };
// };

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
// //채팅방 번호 받아오기
// const getRoomIdDB = (roomId) => {
//   return function (dispatch, getState, { history }) {
//     const token = sessionStorage.getItem("token");
//     axios
//       .post(
//         `http://3.38.180.96/chatroom/create`,
//         {
//           otherId: roomId,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "content-type": "application/json;charset=UTF-8",
//             accept: "application/json,",
//           },
//         }
//       )
//       .then((res) => {
//         console.log(res.data);
//         history.push(`/chatdetail/${res.data.chatRoomId}`);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };
// };

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
// //채팅방에 속해있는 유저정보 불러오기
// const getChatUserDB = (roomId) => {
//   return function (dispatch, getState, { history }) {
//     const token = sessionStorage.getItem("token");
//     axios
//       .get(`http://3.38.180.96/chatroom/user/${roomId}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "content-type": "application/json;charset=UTF-8",
//           accept: "application/json,",
//         },
//       })
//       .then((res) => {
//         dispatch(getChatUser(res.data));
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };
// };

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
    [GET_CHAT_LIST]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.list;
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
    [SUB_MSG]: (state, action) =>
      produce(state, (draft) => {
        // console.log(state.msg);
        draft.msg.push({ ...action.payload.sub });
      }),
    [GET_CHAT_USER]: (state, action) =>
      produce(state, (draft) => {
        draft.user = action.payload.user;
      }),
  },
  initialState
);
