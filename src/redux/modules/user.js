import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

import { apis } from "../../shared/api";

// Action
const USER_INFO = "USER_INFO";

// Action creator
const userInfo = createAction(USER_INFO, (userObj) => ({ userObj }));

// initialState
const initialState = {
  user: { id: 1 },
};

// Middleware

// 로그인
export const loginDB = (username, password) => {
  return async () => {
    try {
      const response = await apis.login(username, password);
      console.log(response);
      const token = response.data;
      console.log(token);
      localStorage.setItem("token", token);
      if (response.status === 200) return true;
    } catch (error) {
      console.log(error);

      return false;
    }
  };
};

// 회원가입
export const signupDB = (userObj) => {
  return async () => {
    try {
      await apis.signupUser(userObj);
      return true;
    } catch (error) {
      console.log(error);
      alert("띠로리....실패했습니다...");
      return false;
    }
  };
};

// 회원가입 - 이메일 중복 체크
export const usernameCheckDB = (username) => {
  return async () => {
    try {
      const response = await apis.usernameCheck(username);
      // console.log(response.data.status);
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
