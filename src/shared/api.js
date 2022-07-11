import axios from "axios";

const token = localStorage.getItem("token");

const api = axios.create({
  baseURL: "http://3.35.49.121:8080/",
  headers: {
    "content-type": "application/json;charset=UTF-8",
    accept: "application/json,",
  },
});

api.interceptors.request.use(function (config) {
  if (token !== undefined) {
    config.headers.common["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export const apis = {
  // 회원정보
  login: (username, password) =>
    api.post("/api/users/login", { username, password }),
  signupUser: (userObj) => api.post("/api/users/register/users", { userObj }),
  signupTech: (userObj) => api.post("/api/users/register/tech", { userObj }),
  usernameCheck: (username) =>
    api.post("/api/users/register/idCheck", { username }),
  loadUserInfo: () => api.get("/api/users/auth"),

  // 메인
  loadMain: () => api.get("/api/home"),

  // 게시물 리스트
  loadQnAList: (category, sort, page) =>
    api.get(
      `/api/qnaList?category=${category}&sort=${sort}&page=${page}&size=6`
    ),
  loadReviewList: (category) => api.get(`/api/reviewList?category=${category}`),
  loadReformList: (category, region, process, page) =>
    api.get(
      `/api/reformList?category=${category}&region=${region}&process=${process}&page=${page}&size=6`
    ),

  // 게시물
  loadQnAPost: (id) => api.get(`/api/qnaPosts/${id}`),

  // 댓글
  loadComments: (postId, page) =>
    api.get(`/api/comments/${postId}?page=${page}&size=5`),

  // 유저 상세페이지
  loadMyPage: () => api.get("/api/users/mypage"),
  loadUserDetail: (id) => api.get(`/api/users/userinfo/${id}`),
  changeUserInfo: (data) => api.put("/api/users/mypage", data),
};
