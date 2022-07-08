import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from "../shared/api";

// Action
const GET_LIST = "GET_LIST";
const GET_QNA_POST = "GET_QNA_POST";

// Cleanup Action
const CLEANUP_LIST = "CLEANUP_LIST";
const CLEANUP_POST = "CLEANUP_POST";

// Action Creator
const getList = createAction(GET_LIST, (List) => ({ List }));
const getQnAPost = createAction(GET_QNA_POST, (Post) => ({ Post }));

// Cleanup Action Creator
export const cleanUpList = createAction(CLEANUP_LIST);
export const cleanUpPost = createAction(CLEANUP_POST);

// InitialState
const initialState = {
  List: {
    posts: [],
  },
  Post: null,
};

// Middleware
export const getQnAListDB = () => {
  return async function (dispatch) {
    try {
      const response = await apis.loadQnAList();
      dispatch(getList(response.data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const getQnAPostDB = (id) => {
  return async function (dispatch) {
    try {
      const response = await apis.loadQnAPost(id);
      dispatch(getQnAPost(response.data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const getReformListDB = (category, region, process, page) => {
  return async function (dispatch) {
    try {
      const response = await apis.loadReformList(
        category,
        region,
        process,
        page
      );
      dispatch(getList(response.data));
    } catch (error) {
      console.log(error);
    }
  };
};

// Reducer
export default handleActions(
  {
    [GET_LIST]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.List = payload.List;
      }),
    [GET_QNA_POST]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.Post = payload.Post;
      }),
    // Cleanup Reducer
    [CLEANUP_LIST]: (state) =>
      produce(state, (draft) => {
        draft.List = initialState.List;
      }),
    [CLEANUP_POST]: (state) =>
      produce(state, (draft) => {
        draft.Post = initialState.Post;
      }),
  },
  initialState
);
