import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from "../shared/api";

// Action
const GET_MAIN = "GET_MAIN";
const GET_QNA_LIST = "GET_QNA_LIST";
const GET_REVIEW_LIST = "GET_REVIEW_LIST";
const GET_LOOKBOOK_LIST = "GET_LOOKBOOK_LIST";

const GET_TECH_INTRO = "GET_TECH_INTRO";

const POST_REVIEW = "POST_REVIEW";

// Action Creator
const getMain = createAction(GET_MAIN, (mainContents) => ({ mainContents }));
const getQnAList = createAction(GET_QNA_LIST, (QnAList) => ({ QnAList }));
const getReviewList = createAction(GET_REVIEW_LIST, (reviewList) => ({
  reviewList,
}));
const getLookbookList = createAction(GET_LOOKBOOK_LIST, (lookbookList) => ({
  lookbookList,
}));
const getTechIntro = createAction(GET_TECH_INTRO, (intro) => ({ intro }));

// InitialState
const initialState = {
  techIntro: "",
  QnAList: [],
  reviewList: [
    {
      id: 1,
      nickname: "이것은닉네임",
      image:
        "http://www.mth.co.kr/wp-content/uploads/2014/12/default-placeholder-1024x1024.png",
      love: 99,
      comment: 99,
      title: "리폼 후기입니다.",
    },
    {
      id: 2,
      nickname: "이것은닉네임",
      image:
        "http://www.mth.co.kr/wp-content/uploads/2014/12/default-placeholder-1024x1024.png",
      love: 99,
      comment: 99,
      title: "리폼 후기입니다.",
    },
  ],
  lookbookList: [
    {
      id: 1,
      nickname: "이것은닉네임",
      image:
        "http://www.mth.co.kr/wp-content/uploads/2014/12/default-placeholder-1024x1024.png",
      likeCount: 99,
      category: "shoes",
      createAt: "2022.07.02",
    },
    {
      id: 2,
      nickname: "이것은닉네임",
      image:
        "http://www.mth.co.kr/wp-content/uploads/2014/12/default-placeholder-1024x1024.png",
      likeCount: 99,
      category: "shoes",
      createAt: "2022.07.02",
    },
  ],
  mainContents: {
    banner: {
      image:
        "http://www.mth.co.kr/wp-content/uploads/2014/12/default-placeholder-1024x1024.png",
      toUrl: "/",
    },
    co2: { count: "999", co2Reduce: "99" },
    lookbookList: [
      {
        id: 1,
        nickname: "이것은닉네임",
        image:
          "http://www.mth.co.kr/wp-content/uploads/2014/12/default-placeholder-1024x1024.png",
        likeCount: 99,
        category: "shoes",
        createAt: "2022.07.02",
      },
      {
        id: 122,
        nickname: "이것은닉네임",
        image:
          "http://www.mth.co.kr/wp-content/uploads/2014/12/default-placeholder-1024x1024.png",
        likeCount: 99,
        category: "shoes",
        createAt: "2022.07.02",
      },
      {
        id: 1232,
        nickname: "이것은닉네임",
        image:
          "http://www.mth.co.kr/wp-content/uploads/2014/12/default-placeholder-1024x1024.png",
        likeCount: 99,
        category: "shoes",
        createAt: "2022.07.02",
      },
      {
        id: 1232,
        nickname: "이것은닉네임",
        image:
          "http://www.mth.co.kr/wp-content/uploads/2014/12/default-placeholder-1024x1024.png",
        likeCount: 99,
        category: "shoes",
        createAt: "2022.07.02",
      },
      {
        id: 1232,
        nickname: "이것은닉네임",
        image:
          "http://www.mth.co.kr/wp-content/uploads/2014/12/default-placeholder-1024x1024.png",
        likeCount: 99,
        category: "shoes",
        createAt: "2022.07.02",
      },
      {
        id: 1232,
        nickname: "이것은닉네임",
        image:
          "http://www.mth.co.kr/wp-content/uploads/2014/12/default-placeholder-1024x1024.png",
        likeCount: 99,
        category: "shoes",
        createAt: "2022.07.02",
      },
    ],
    reviewList: [
      {
        id: 20,
        nickname: "이것은닉네임",
        image:
          "http://www.mth.co.kr/wp-content/uploads/2014/12/default-placeholder-1024x1024.png",
        love: 123,
        comment: 123,
        title: "리폼 후기입니다.",
      },
      {
        id: 202,
        nickname: "이것은닉네임",
        image:
          "http://www.mth.co.kr/wp-content/uploads/2014/12/default-placeholder-1024x1024.png",
        love: 99,
        comment: 99,
        title: "리폼 후기입니다.",
      },
    ],
    qnaList: [{}],
    reformList: [
      {
        id: 20,
        nickname: "이것은닉네임",
        image:
          "http://www.mth.co.kr/wp-content/uploads/2014/12/default-placeholder-1024x1024.png",
        love: 123,
        comment: 123,
        title: "리폼 후기입니다.",
        process: "after",
        region: "경기권",
      },
      {
        id: 202,
        nickname: "이것은닉네임",
        image:
          "http://www.mth.co.kr/wp-content/uploads/2014/12/default-placeholder-1024x1024.png",
        love: 99,
        comment: 99,
        title: "리폼 후기입니다.",
        process: "before",
        region: "경기권",
      },
      {
        id: 202,
        nickname: "이것은닉네임",
        image:
          "http://www.mth.co.kr/wp-content/uploads/2014/12/default-placeholder-1024x1024.png",
        love: 99,
        comment: 99,
        title: "리폼 후기입니다.",
        process: "ing",
        region: "경기권",
      },
    ],
  },
};

// Middleware

// 메인 - 컨텐츠 불러오기
export const getMainDB = () => {
  return async (dispatch) => {
    try {
      const response = await apis.loadMain();
      dispatch(getMain(response));
    } catch (error) {
      console.log(error);
    }
  };
};

// 질문 게시판 - 게시물 불러오기
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

// 후기 게시판 - 게시물 불러오기
export const getReviewListDB = (category, sort) => {
  return async (dispatch) => {
    try {
      const response = await apis.loadReviewList(category, sort);
      dispatch(getReviewList(response));
    } catch (error) {
      console.log(error);
    }
  };
};

// 룩북 게시판 - 게시물 불러오기
export const getLookbookListDB = (sort) => {
  return async (dispatch) => {
    try {
      const response = await apis.loadLookbookList(sort);
      dispatch(getLookbookList(response));
    } catch (error) {
      console.log(error);
    }
  };
};

// 룩북 게시물 작성 - 기술자 소개 불러오기
export const getTechIntroDB = () => {
  return async (dispatch) => {
    try {
      const response = await apis.loadIntro();
      dispatch(getTechIntro(response));
    } catch (error) {
      console.log(error);
    }
  };
};

// 게시물 작성하기
export const postDB = (formData, type) => {
  return async () => {
    try {
      if (type === "review") await apis.postReview(formData);
      if (type === "lookbook") await apis.postLookbook(formData);
      if (type === "qna") await apis.postQna(formData);
      if (type === "reform") await apis.postReform(formData);
    } catch (error) {
      console.log(error);
    }
  };
};

// Reducer
export default handleActions(
  {
    [GET_MAIN]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.mainContents = payload.mainContents;
      }),
    [GET_QNA_LIST]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.QnAList = payload.QnAList;
      }),
    [GET_REVIEW_LIST]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.reviewList = payload.reviewList;
      }),
    [GET_LOOKBOOK_LIST]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.lookbookList = payload.lookbookList;
      }),
    [GET_TECH_INTRO]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.techIntro = payload.intro;
      }),
  },
  initialState
);
