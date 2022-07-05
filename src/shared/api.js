import axios from "axios";

const token = localStorage.getItem("token");

const api = axios.create({
  baseURL: "http://localhost:5001/",
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

  // 게시물
  loadQnAList: () => api.get("/qnaList"),
  loadReviewList: (category) => api.get(`/api/reviewList?category=${category}`),

  // 유저 상세페이지
  loadMyPage: () => api.get("/mypage"),
};
