import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from "../shared/api";

// Action
const GET_MAIN = "GET_MAIN";
const GET_QNA_LIST = "GET_QNA_LIST";
const GET_REVIEW_LIST = "GET_REVIEW_LIST";
const GET_LOOKBOOK_LIST = "GET_LOOKBOOK_LIST";
const GET_REFORM_LIST = "GET_REFORM_LIST";

const GET_TECH_INTRO = "GET_TECH_INTRO";

const GET_POST = "GET_POST";

// // Cleanup Action
// const CLEANUP_LIST = "CLEANUP_LIST";
// const CLEANUP_POST = "CLEANUP_POST";

// Action Creator
const getMain = createAction(GET_MAIN, (mainContents) => ({ mainContents }));
const getQnAList = createAction(GET_QNA_LIST, (QnAList) => ({ QnAList }));
const getReformList = createAction(GET_REFORM_LIST, (reformList) => ({
  reformList,
}));
const getReviewList = createAction(GET_REVIEW_LIST, (reviewList) => ({
  reviewList,
}));
const getLookbookList = createAction(GET_LOOKBOOK_LIST, (lookbookList) => ({
  lookbookList,
}));
const getTechIntro = createAction(GET_TECH_INTRO, (intro) => ({ intro }));

const getPost = createAction(GET_POST, (Post) => ({ Post }));

// // Cleanup Action Creator
// export const cleanUpList = createAction(CLEANUP_LIST);
// export const cleanUpPost = createAction(CLEANUP_POST);

// InitialState
const initialState = {
  techIntro: "",
  qnaList: [],
  reformList: [],
  reviewList: [{}],
  lookbookList: [{}],
  Post: null,
  Comments: [],
  mainContents: {
    banner: {
      image:
        "http://www.mth.co.kr/wp-content/uploads/2014/12/default-placeholder-1024x1024.png",
      toUrl: "/",
    },
    co2: { count: "999", co2Reduce: "99" },
    lookbookList: [{}],
    reviewList: [{}],
    qnaList: [{}],
    reformList: [{}],
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
export const getQnAListDB = (category, sort, page) => {
  return async function (dispatch) {
    try {
      const response = await apis.loadQnAList(category, sort, page);
      dispatch(getQnAList(response.data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const getQnAPostDB = (id) => {
  return async function (dispatch) {
    try {
      const response = await apis.loadQnAPost(id);
      dispatch(getPost(response.data));
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
      dispatch(getReformList(response.data));
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
export const getLookbookListDB = (category, sort) => {
  return async (dispatch) => {
    try {
      const response = await apis.loadLookbookList(category, sort);
      console.log(response);
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
        draft.qnaList = payload.qnaList;
      }),
    [GET_POST]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.Post = payload.Post.post;
        draft.Comments = payload.Post.comments;
      }),
    [GET_REVIEW_LIST]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.reviewList = payload.reviewList;
      }),
    [GET_LOOKBOOK_LIST]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.lookbookList = payload.lookbookList;
      }),
    [GET_REFORM_LIST]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.reformList = payload.reformList;
      }),
    [GET_TECH_INTRO]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.techIntro = payload.intro;
      }),
    //   // Cleanup Reducer
    //   [CLEANUP_LIST]: (state) =>
    //   produce(state, (draft) => {
    //     draft.List = initialState.List;
    //   }),
    // [CLEANUP_POST]: (state) =>
    //   produce(state, (draft) => {
    //     draft.Post = initialState.Post;
    //     draft.Comments = initialState.Comments;
    //   }),
  },
  initialState
);
