import axios from "axios";

const token = localStorage.getItem("token");

const api = axios.create({
  baseURL: "http://localhost:5001/",
  headers: {
    "content-type": "application/json;charset=UTF-8",
    accept: "application/json,",
  },
});

const formDataApi = axios.create({
  baseURL: "http://localhost:5001/",
  headers: {
    "content-type": "multipart/form-data",
  },
});

api.interceptors.request.use(function (config) {
  if (token !== undefined) {
    config.headers.common["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

formDataApi.interceptors.request.use(function (config) {
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
  usernameCheck: (username) =>
    api.post("/api/users/register/idCheck", { username }),
  loadUserInfo: () => api.get("/api/users/auth"),
  loadIntro: () => api.get("/api/lookPosts"),

  // 메인
  loadMain: () => api.get("/api/home"),

  // 게시물 조회
  loadQnAList: () => api.get("/api/qnaList"),
  loadReviewList: (category, sort) =>
    api.get(`/api/reviewList?category=${category}&sort=${sort}`),
  loadLookbookList: (sort) => api.get(`/api/lookList?sort=${sort}`),

  // 게시물 등록
  postQna: (formData) => formDataApi.post("/api/qnaPosts", { formData }),
  postReview: (formData) => formDataApi.post("/api/reviewPosts", { formData }),
  postReform: (formData) => formDataApi.post("/api/reformPosts", { formData }),
  postLookbook: (formData) => formDataApi.post("/api/lookPosts", { formData }),

  // 게시물 수정
  editQna: (formData, id) =>
    formDataApi.put("/api/qnaPosts/" + id, { formData }),
  editReview: (formData, id) =>
    formDataApi.put("/api/reviewPosts/" + id, { formData }),
  editReform: (formData, id) =>
    formDataApi.put("/api/reformPosts/" + id, { formData }),
  editLookbook: (formData, id) =>
    formDataApi.put("/api/lookPosts/" + id, { formData }),
};
