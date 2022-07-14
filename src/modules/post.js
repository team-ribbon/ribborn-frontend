import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from "../shared/api";

// Action
const GET_MAIN = "GET_MAIN";
const GET_POST_LIST = "GET_POST_LIST";

const GET_TECH_INTRO = "GET_TECH_INTRO";

const GET_POST = "GET_POST";
const GET_NO_COMMENT_POST = "GET_NO_COMMENT_POST";
const LIKE_SUCCESS = "LIKE_SUCCESS";
const NEW_COMMENT = "NEW_COMMENT";
const DELETE_COMMENT = "DELETE_COMMENT";
const MODIFY_COMMENT = "MODIFY_COMMENT";
const NEW_COMMENT_LOAD = "NEW_COMMENT_LOAD";
const MORE_COMMENT_LOAD = "MORE_COMMENT_LOAD";

// Cleanup Action
const CLEANUP_POST_LIST = "CLEANUP_POST_LIST";
const CLEANUP_POST = "CLEANUP_POST";

// Action Creator
const getMain = createAction(GET_MAIN, (mainContents) => ({ mainContents }));
const getPostList = createAction(GET_POST_LIST, (PostList) => ({ PostList }));
const getTechIntro = createAction(GET_TECH_INTRO, (intro) => ({ intro }));

const getPost = createAction(GET_POST, (Post) => ({ Post }));
const getNoCommentPost = createAction(GET_NO_COMMENT_POST, (Post) => ({
  Post,
}));
const likesuccess = createAction(LIKE_SUCCESS);
const newComment = createAction(NEW_COMMENT);
const deleteComment = createAction(DELETE_COMMENT, (commentId) => ({
  commentId,
}));
const modifyComment = createAction(MODIFY_COMMENT, (info) => ({ info }));
const newCommentLoad = createAction(NEW_COMMENT_LOAD, (Comments) => ({
  Comments,
}));
const moreCommentLoad = createAction(MORE_COMMENT_LOAD, (Comments) => ({
  Comments,
}));

// Cleanup Action Creator
export const cleanUpPostList = createAction(CLEANUP_POST_LIST);
export const cleanUpPost = createAction(CLEANUP_POST);

// InitialState
const initialState = {
  techIntro: "",
  PostList: [],
  Post: null,
  Comments: [],
  mainContents: {
    banner: {
      image:
        "http://www.mth.co.kr/wp-content/uploads/2014/12/default-placeholder-1024x1024.png",
      toUrl: "/",
    },
    co2: { count: "999", co2Reduce: "99" },
    lookbookList: [],
    reviewList: [],
    qnaList: [],
    reformList: [],
  },
};

// Middleware

// 메인 - 컨텐츠 불러오기
export const getMainDB = () => {
  return async (dispatch) => {
    try {
      const response = await apis.loadMain();
      dispatch(getMain(response.data));
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
      dispatch(getPostList(response.data));
    } catch (error) {
      console.log(error);
    }
  };
};

// 견적 게시판 - 게시물 불러오기
export const getReformListDB = (category, region, process, page) => {
  return async function (dispatch) {
    try {
      const response = await apis.loadReformList(
        category,
        region,
        process,
        page
      );
      dispatch(getPostList(response.data));
    } catch (error) {
      console.log(error);
    }
  };
};

// 후기 게시판 - 게시물 불러오기
export const getReviewListDB = (category, sort, page) => {
  return async (dispatch) => {
    try {
      const response = await apis.loadReviewList(category, sort, page);
      dispatch(getPostList(response.data));
    } catch (error) {
      console.log(error);
    }
  };
};

// 룩북 게시판 - 게시물 불러오기
export const getLookbookListDB = (category, sort, page) => {
  return async (dispatch) => {
    try {
      const response = await apis
        .loadLookbookList(category, sort, page)
        .then((res) => {
          dispatch(getPostList(res.data));
        });
    } catch (error) {
      console.log(error);
    }
  };
};

// 질문 게시글 불러오기
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

// 리뷰 게시글 불러오기
export const getReviewPostDB = (id) => {
  return async function (dispatch) {
    try {
      const response = await apis.loadReviewPost(id);
      dispatch(getPost(response.data));
    } catch (error) {
      console.log(error);
    }
  };
};

// 리폼 게시글 불러오기
export const getReformPostDB = (id) => {
  return async function (dispatch) {
    try {
      const response = await apis.loadReformPost(id);
      dispatch(getNoCommentPost(response.data));
    } catch (error) {
      console.log(error);
    }
  };
};

// 룩북 게시글 불러오기
export const getLookbookPostDB = (id) => {
  return async function (dispatch) {
    try {
      const response = await apis.loadLookbookPost(id);
      dispatch(getNoCommentPost(response.data));
    } catch (error) {
      console.log(error);
    }
  };
};

// 게시물 좋아요
export const likePostDB = (id, like) => {
  return async function (dispatch) {
    try {
      const response = await apis.likePost(id, like).then((res) => {
        dispatch(likesuccess());
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
};

// 게시물 삭제
export const deletePostDB = (id) => {
  return async function () {
    try {
      const response = await apis.deletePost(id);
    } catch (error) {
      console.log(error);
    }
  };
};

// 댓글달기
export const PostCommentDB = (id, comment, page) => {
  return async function (dispatch) {
    await apis
      .uploadComment(id, comment)
      .then((res) => {
        console.log(res);
        dispatch(newComment());
        dispatch(GetCommentDB(id, 0, (page + 1) * 5));
      })
      .catch((error) => {
        console.log(error);
        alert("실패했어요!");
      });
  };
};

// 댓글 삭제
export const deleteCommentDB = (id, commentId) => {
  return async (dispatch) => {
    try {
      await apis.deleteComment(id, commentId);
      dispatch(deleteComment(commentId));
    } catch (error) {
      console.log(error);
    }
  };
};

// 댓글 수정
export const modifyCommentDB = (id, commentId, comment) => {
  return async (dispatch) => {
    try {
      await apis.modifyComment(id, commentId, comment);
      dispatch(modifyComment({ id: commentId, comment: comment }));
    } catch (error) {
      console.log(error);
    }
  };
};

// 댓글 페이징

export const GetCommentDB = (id, page, num) => {
  return async function (dispatch) {
    try {
      const response = await apis.loadComments(id, page, num).then((res) => {
        if (page === 0) {
          console.log(res.data);
          dispatch(newCommentLoad(res.data));
        } else {
          dispatch(moreCommentLoad(res.data));
        }
      });
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
      dispatch(getTechIntro(response.data));
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
    [GET_POST_LIST]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.PostList = payload.PostList;
      }),
    [GET_POST]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.Post = payload.Post.post;
        draft.Comments = payload.Post.comment;
      }),
    [GET_NO_COMMENT_POST]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.Post = payload.Post;
      }),
    [LIKE_SUCCESS]: (state) =>
      produce(state, (draft) => {
        draft.Post.liked = !draft.Post.liked;
        draft.Post.liked ? draft.Post.likeCount++ : draft.Post.likeCount--;
      }),
    [NEW_COMMENT]: (state) =>
      produce(state, (draft) => {
        draft.Post.commentCount++;
      }),
    [DELETE_COMMENT]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.Post.commentCount--;
        draft.Comments = draft.Comments.filter(
          (v) => v.id !== payload.commentId
        );
      }),
    [MODIFY_COMMENT]: (state, { payload }) =>
      produce(state, (draft) => {
        const index = draft.Comments.findIndex((v) => v.id === payload.info.id);
        draft.Comments[index].comment = payload.info.comment;
      }),
    [NEW_COMMENT_LOAD]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.Comments = payload.Comments.content;
      }),
    [MORE_COMMENT_LOAD]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.Comments.push(...payload.Comments.content);
      }),
    [GET_TECH_INTRO]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.techIntro = payload.intro.introduction;
      }),
    // Cleanup Reducer
    [CLEANUP_POST_LIST]: (state) =>
      produce(state, (draft) => {
        draft.PostList = initialState.PostList;
      }),
    [CLEANUP_POST]: (state) =>
      produce(state, (draft) => {
        draft.Post = initialState.Post;
        draft.Comments = initialState.Comments;
      }),
  },
  initialState
);
