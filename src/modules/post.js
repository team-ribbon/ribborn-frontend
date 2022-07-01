import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from "../shared/api";

// Action
const GET_QNA_LIST = "GET_QNA_LIST";

// Action Creator
const getQnAList = createAction(GET_QNA_LIST, (QnAList) => ({ QnAList }));

// InitialState
const initialState = {
  QnAList: {
    posts: [],
  },
};

// Middleware
export const getQnAListDB = () => {
  return async function (dispatch) {
    try {
      const response = await apis.loadQnAList();
      dispatch(getQnAList(response.data));
    } catch (error) {
      console.log(error);
    }
  };
};

// Reducer
export default handleActions(
  {
    [GET_QNA_LIST]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.QnAList = payload.QnAList;
      }),
  },
  initialState
);
