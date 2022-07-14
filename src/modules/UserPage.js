import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from "../shared/api";

// Action
const GET_MY_PAGE = "GET_MY_PAGE";
const CHANGE_MY_INFO = "CHANGE_MY_INFO";

// Cleanup Action
const CLEANUP_MY_PAGE = "CLEANUP_MY_PAGE";

// Action Creator
const getMyPage = createAction(GET_MY_PAGE, (myPage) => ({ myPage }));
const changeMyInfo = createAction(CHANGE_MY_INFO, (data) => ({ data }));

// Cleanup Action Creator
export const cleanUpMyPage = createAction(CLEANUP_MY_PAGE);

// InitialState
const initialState = {
  myPage: {
    posts: null,
    users: null,
    qnaList: null,
    lookbookList: null,
    reviewList: null,
    reformList: null,
  },
};

// Middleware
export const getMyPageDB = (category) => {
  return async function (dispatch) {
    try {
      const response = await apis.loadMyPage(category);
      dispatch(getMyPage(response.data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const changeMyDataDB = (data) => {
  return async function (dispatch) {
    try {
      const response = await apis.changeUserInfo(data).then((res) => {
        getMyPageDB();
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getUserDetailDB = (data) => {
  return async function (dispatch) {
    try {
      const response = await apis.changeUserInfo(data).then(() => {
        dispatch(changeMyInfo(data));
      });
    } catch (error) {
      console.log(error);
    }
  };
};

// Reducer
export default handleActions(
  {
    [GET_MY_PAGE]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.myPage = payload.myPage;
      }),
    [CHANGE_MY_INFO]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.myPage = payload.myPage;
      }),
    // Cleanup Reducer
    [CLEANUP_MY_PAGE]: (state) =>
      produce(state, (draft) => {
        draft.myPage = initialState.myPage;
      }),
  },

  initialState
);
