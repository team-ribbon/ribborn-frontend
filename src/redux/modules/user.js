import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

import { apis } from "../../shared/api";

// Action
const USER_INFO = "USER_INFO";

// Action creator
const userInfo = createAction(USER_INFO, (userObj) => ({ userObj }));

// initialState
const initialState = {
  user: {},
};

// Middleware

// 로그인
export const loginDB = (username, password) => {
  return async (dispatch) => {
    try {
      const response = await apis.login(username, password);
      //   const token
      //   localStorage.setItem("token", token);
    } catch (error) {
      console.log(error);
      return false;
    }
  };
};

// 회원가입
export const signupDB = (userObj) => {
  delete userObj.password2;
  return async () => {
    try {
      if (userObj.userType === 0) {
        await apis.signupUser(userObj);
      }
      if (userObj.userType === 1) {
        await apis.signupTech(userObj);
      }
    } catch (error) {
      console.log(error);
    }
  };
};

// 회원가입 - 이메일 중복 체크
export const usernameCheckDB = (username) => {
  return async () => {
    try {
      await apis.usernameCheck(username);
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
      dispatch(userInfo(response));
    } catch (error) {
      console.log(error);
    }
  };
};

// Reducer
export default handleActions(
  {
    [USER_INFO]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.user = payload.userObj;
      }),
  },
  initialState
);
