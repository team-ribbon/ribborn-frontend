import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from "../../shared/api";

// Action
const GET_MAIN = "GET_MAIN";
const GET_POST_LIST = "GET_POST_LIST";
const GET_MORE_POST_LIST = "GET_MORE_POST_LIST";
const LOAD_DONE = "LOAD_DONE";
const LOAD_DONE_RESET = "LOAD_DONE_RESET";

const GET_TECH_INTRO = "GET_TECH_INTRO";

const GET_POST = "GET_POST";
const GET_NO_COMMENT_POST = "GET_NO_COMMENT_POST";
const LIKE_SUCCESS = "LIKE_SUCCESS";

const CHANGE_PROCESS = "CHANGE_PROCESS";

const DELETE_COMMENT = "DELETE_COMMENT";
const MODIFY_COMMENT = "MODIFY_COMMENT";
const NEW_COMMENT_LOAD = "NEW_COMMENT_LOAD";
const MORE_COMMENT_LOAD = "MORE_COMMENT_LOAD";
const EVENT_JOINED = "EVENT_JOINED";

// Cleanup Action
const CLEANUP_POST_LIST = "CLEANUP_POST_LIST";
const CLEANUP_POST = "CLEANUP_POST";

// Action Creator
const getMain = createAction(GET_MAIN, (mainContents) => ({ mainContents }));
const getPostList = createAction(GET_POST_LIST, (PostList) => ({ PostList }));
const getMorePostList = createAction(GET_MORE_POST_LIST, (PostList) => ({
  PostList,
}));
const loadDone = createAction(LOAD_DONE);
export const loadDoneReset = createAction(LOAD_DONE_RESET);
const getTechIntro = createAction(GET_TECH_INTRO, (intro) => ({ intro }));

const getPost = createAction(GET_POST, (Post) => ({ Post }));
const getNoCommentPost = createAction(GET_NO_COMMENT_POST, (Post) => ({
  Post,
}));
const likesuccess = createAction(LIKE_SUCCESS);

const changeProcess = createAction(CHANGE_PROCESS, (process) => ({ process }));

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
const EventJoined = createAction(EVENT_JOINED);

// Cleanup Action Creator
export const cleanUpPostList = createAction(CLEANUP_POST_LIST);
export const cleanUpPost = createAction(CLEANUP_POST);

// InitialState
const initialState = {
  loadedEverything: false,
  techIntro: "",
  PostList: [],
  Post: null,
  Comments: [],
  mainContents: {
    banner: [
      {
        image:
          "http://www.mth.co.kr/wp-content/uploads/2014/12/default-placeholder-1024x1024.png",
        url: "/",
      },
      {
        image:
          "http://www.mth.co.kr/wp-content/uploads/2014/12/default-placeholder-1024x1024.png",
        url: "/",
      },
    ],
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
      if (response.data.length < 6) {
        dispatch(loadDone());
      }
      if (page === 0) {
        dispatch(getPostList(response.data));
      } else {
        dispatch(getMorePostList(response.data));
      }
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
      if (response.data.length < 6) {
        dispatch(loadDone());
      }
      if (page === 0) {
        dispatch(getPostList(response.data));
      } else {
        dispatch(getMorePostList(response.data));
      }
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
      if (response.data.length < 6) {
        dispatch(loadDone());
      }
      if (page === 0) {
        dispatch(getPostList(response.data));
      } else {
        dispatch(getMorePostList(response.data));
      }
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
          if (res.data.length < 6) {
            dispatch(loadDone());
          }
          if (page === 0) {
            dispatch(getPostList(res.data));
          } else {
            dispatch(getMorePostList(res.data));
          }
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

// 이벤트 게시글 불러오기
export const getEventPostDB = (id) => {
  return async function (dispatch) {
    try {
      const response = await apis.loadEventPost(id);
      dispatch(getNoCommentPost(response.data));
    } catch (error) {
      console.log(error);
    }
  };
};

// 이벤트 참가하기
export const ParticipateEventDB = () => {
  return async function (dispatch) {
    try {
      const response = await apis.ParticipateEventPost();
      dispatch(EventJoined());
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
    } catch (error) {
      console.log(error);
    }
  };
};

// 게시물 좋아요
export const processChangeDB = (id, process) => {
  return async function (dispatch) {
    try {
      const response = await apis.changeProcess(id, process).then((res) => {
        dispatch(changeProcess(process));
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
export const PostCommentDB = (id, comment) => {
  return async function (dispatch) {
    await apis
      .uploadComment(id, comment)
      .then(() => {
      })
      .catch((error) => {
        console.log(error);
        alert("실패했어요!");
      });
  };
};

// 댓글 삭제
export const deleteCommentDB = (id, commentId, page) => {
  return async (dispatch) => {
    try {
      await apis.deleteComment(id, commentId);
      dispatch(deleteComment(commentId));
      dispatch(GetCommentDB(id, 0, (page + 1) * 5));
    } catch (error) {
      console.log(error);
    }
  };
};

// 댓글 수정
export const modifyCommentDB = (id, commentId, comment, page) => {
  return async (dispatch) => {
    try {
      await apis.modifyComment(id, commentId, comment);
      dispatch(modifyComment({ id: commentId, comment: comment }));
      dispatch(GetCommentDB(id, 0, (page + 1) * 5));
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
        if (res.data.content.length < 5) {
          dispatch(loadDone());
        }
        if (page === 0) {
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

export const EditPostDB = (formData, type, id) => {
  return async () => {
    try {
      if (type === "review") await apis.editReview(formData, id);
      if (type === "lookbook") await apis.editLookbook(formData, id);
      if (type === "qna") await apis.editQna(formData, id);
      if (type === "reform") await apis.editReform(formData, id);
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
    [GET_MORE_POST_LIST]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.PostList.push(...payload.PostList);
      }),
    [LOAD_DONE]: (state) =>
      produce(state, (draft) => {
        draft.loadedEverything = true;
      }),
    [LOAD_DONE_RESET]: (state) =>
      produce(state, (draft) => {
        draft.loadedEverything = false;
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
    [CHANGE_PROCESS]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.Post.process = payload.process;
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
        draft.Post.commentCount = payload.Comments.totalElements;
      }),
    [MORE_COMMENT_LOAD]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.Comments.push(...payload.Comments.content);
        draft.Post.commentCount = payload.Comments.totalElements;
      }),
    [GET_TECH_INTRO]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.techIntro = payload.intro.introduction;
      }),
    [EVENT_JOINED]: (state) =>
      produce(state, (draft) => {
        draft.Post.participation = "now";
      }),
    // Cleanup Reducer
    [CLEANUP_POST_LIST]: (state) =>
      produce(state, (draft) => {
        draft.PostList = initialState.PostList;
        draft.loadedEverything = false;
      }),
    [CLEANUP_POST]: (state) =>
      produce(state, (draft) => {
        draft.Post = initialState.Post;
        draft.Comments = initialState.Comments;
        draft.loadedEverything = false;
      }),
  },
  initialState
);
