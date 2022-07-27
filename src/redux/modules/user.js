import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

import { apis } from "../../shared/api";

// Action
const USER_INFO = "USER_INFO";
const CLEAR_USER_INFO = "CLEAR_USER_INFO";

// Action creator
const userInfo = createAction(USER_INFO, (userObj) => ({ userObj }));
export const clearUserInfo = createAction(CLEAR_USER_INFO);

// initialState
const initialState = {
  user: null,
  isLogin: false,
};

// Middleware

// 로그인
export const loginDB = (username, password) => {
  return async (dispatch) => {
    let success = null;
    try {
      const response = await apis.login(username, password);
      localStorage.setItem("token", response.data);
      dispatch(loadUserInfoDB());
      if (response.status === 200) {
        return true;
      }
    } catch (error) {
      success = false;
    }
    return success;
  };
};

// 회원가입
export const signupDB = (userObj) => {
  return async () => {
    try {
      await apis.signupUser(userObj);
      return true;
    } catch (error) {
      return false;
    }
  };
};

// 회원가입 - 이메일 중복 체크
export const usernameCheckDB = (username) => {
  return async () => {
    try {
      const response = await apis.usernameCheck(username);
      if (response?.data?.status === "Success") return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };
};

// 유저 정보 조회
export const loadUserInfoDB = () => {
  return async (dispatch) => {
    try {
      const response = await apis.loadUserInfo();
      dispatch(userInfo(response.data));
    } catch (error) {
      dispatch(clearUserInfo());
      localStorage.removeItem("token");
    }
  };
};

// Reducer
export default handleActions(
  {
    [USER_INFO]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.user = payload.userObj;
        draft.isLogin = true;
      }),
    [CLEAR_USER_INFO]: (state) =>
      produce(state, (draft) => {
        draft.user = initialState.user;
        draft.isLogin = initialState.isLogin;
      }),
  },
  initialState
);
