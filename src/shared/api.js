import axios from "axios";

const token = localStorage.getItem("token");

const api = axios.create({
  baseURL: "http://3.35.49.121:8080",
  headers: {
    "content-type": "application/json;charset=UTF-8",
    accept: "application/json,",
  },
});

const formDataApi = axios.create({
  baseURL: "http://3.35.49.121:8080",
  headers: {
    "content-type": "multipart/form-data",
  },
});

api.interceptors.request.use(function (config) {
  if (token !== undefined) {
    config.headers.common["Authorization"] = token;
  }
  return config;
});

formDataApi.interceptors.request.use(function (config) {
  if (token !== undefined) {
    config.headers.common["Authorization"] = token;
  }
  return config;
});

export const apis = {
  // 회원정보
  login: (username, password) =>
    api.post("/api/users/login", { username, password }),
  signupUser: (userObj) => api.post("/api/users/register/users", { userObj }),
  usernameCheck: (username) =>
    api.post("/api/users/register/idCheck", { username }),
  loadUserInfo: () => api.get("/api/users/auth"),
  loadIntro: () => api.get("/api/lookPosts"),

  // 메인
  loadMain: () => api.get("/api/home"),

  // 게시물 리스트 조회
  loadQnAList: (category, sort, page) =>
    api.get(
      `/api/qnaList?category=${category}&sort=${sort},desc&page=${page}&size=6`
    ),
  loadReviewList: (category, sort, page) =>
    api.get(
      `/api/reviewList?category=${category}&sort=${sort},desc&page=${page}&size=6`
    ),
  loadLookbookList: (category, sort, page) =>
    api.get(
      `/api/lookList?category=${category}&sort=${sort},desc&page=${page}&size=6`
    ),
  // loadReformList: (category, region, process, page) =>
  // api.get(
  //   `/api/reformList?category=${category}&sort=createAt,desc&region=${region}&process=${process}&page=${page}&size=6`
  // ),
  loadReformList: (category, region, process, page) =>
    api.get(
      `/api/reformList?category=${category}&sort=createAt,desc&page=${page}&size=6`
    ),

  // 게시물 상세
  loadQnAPost: (id) => api.get(`/api/qnaPosts/${id}`),
  loadReviewPost: (id) => api.get(`/api/reviewPosts/${id}`),
  likePost: (id, like) => api.post(`/api/post/${id}/love`, { love: like }),
  deletePost: (id) => api.delete(`/api/post/${id}`),

  // 댓글
  loadComments: (postId, page, num) =>
    api.get(`/api/comments/${postId}?page=${page}&size=${num}`),
  uploadComment: (id, comment) => {
    api.post(`/api/post/${id}/comment`, {
      comment: comment,
    });
  },
  deleteComment: (postId, commentId) => {
    api.delete(`/api/post/${postId}/comment/${commentId}`);
  },

  // 게시물 등록
  postQna: (formData) => formDataApi.post("/api/qnaPosts", formData),
  postReview: (formData) => formDataApi.post("/api/reviewPosts", formData),
  postReform: (formData) => formDataApi.post("/api/reformPosts", formData),
  postLookbook: (formData) => formDataApi.post("/api/lookPosts", formData),

  // 게시물 수정
  editQna: (formData, id) => formDataApi.put("/api/qnaPosts/" + id, formData),
  editReview: (formData, id) =>
    formDataApi.put("/api/reviewPosts/" + id, formData),
  editReform: (formData, id) =>
    formDataApi.put("/api/reformPosts/" + id, formData),
  editLookbook: (formData, id) =>
    formDataApi.put("/api/lookPosts/" + id, formData),

  // 유저 상세페이지
  loadMyPage: () => api.get("/api/users/mypage"),
  loadUserDetail: (id) => api.get(`/api/users/userinfo/${id}`),
  changeUserInfo: (data) => api.put("/api/users/mypage", data),
};
