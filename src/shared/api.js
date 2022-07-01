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

  // 게시물
  loadQnAList: () => api.get("/api/qnaList"),
};
