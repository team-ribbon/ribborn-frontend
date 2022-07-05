import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from "../shared/api";

// Action
const GET_MY_PAGE = "GET_MY_PAGE";

// Cleanup Action
const CLEANUP_MY_PAGE = "CLEANUP_MY_PAGE";

// Action Creator
const getMyPage = createAction(GET_MY_PAGE, (myPage) => ({ myPage }));

// Cleanup Action Creator
export const cleanUpMyPage = createAction(CLEANUP_MY_PAGE);

// InitialState
const initialState = {
  myPage: {
    users: null,
    qna: null,
    lookbook: null,
    review: null,
    reform: null,
  },
};

// Middleware
export const getMyPageDB = () => {
  return async function (dispatch) {
    try {
      const response = await apis.loadMyPage();
      dispatch(getMyPage(response.data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const getUserDetailDB = (id) => {
  return async function (dispatch) {
    try {
      const response = await apis.loadUserDetail(id);
      dispatch(getMyPage(response.data));
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
    // Cleanup Reducer
    [CLEANUP_MY_PAGE]: (state) =>
      produce(state, (draft) => {
        draft.myPage = {
          users: null,
          qna: null,
          lookbook: null,
          review: null,
          reform: null,
        };
      }),
  },

  initialState
);
