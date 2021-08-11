import axios from "axios";
import { getCookie, multiCookie } from "./Cookie";
import { history } from "../redux/configureStore";

const instance = axios.create({
  baseURL: "http://54.180.141.39/",
  headers: {
    "content-type": "application/json;charset=UTF-8",
    accept: "application/json,",
  },
});

instance.interceptors.request.use(function (config) {
  const accessToken = getCookie("token");
  config.headers.common["Authorization"] = ` Bearer ${accessToken}`;
  return config;
});

let isTokenRefreshing = false;
let refreshSubscribers = [];

const onTokenRefreshed = (accessToken) => {
  refreshSubscribers.map((callback) => callback(accessToken));
};

const addRefreshSubscriber = (callback) => {
  refreshSubscribers.push(callback);
};

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const {
      config,
      response: { status },
    } = error;
    const originalRequest = config;
    if (status === 401) {
      if (!isTokenRefreshing) {
        // isTokenRefreshing이 false인 경우에만 token refresh 요청
        isTokenRefreshing = true;
        const refresh_token = getCookie("refreshToken");
        const token = getCookie("token");
        const { data } = await instance.post(`api/member/reissue`, {
          accessToken: token,
          refreshToken: refresh_token,
        });

        const accessCookie = {
          name: "token",
          value: data.accessToken,
        };
        const refreshCookie = {
          name: "refreshToken",
          value: data.refreshToken,
        };
        multiCookie(accessCookie, refreshCookie);
        isTokenRefreshing = false;
        instance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${accessCookie.value}`;
        onTokenRefreshed(accessCookie.value);
        window.alert("로그인 시간이 만료되었습니다! 새로고침 해주세요!");
      }
      const retryOriginalRequest = new Promise((resolve) => {
        addRefreshSubscriber((accessToken) => {
          originalRequest.headers.Authorization = "Bearer " + accessToken;
          resolve(instance(originalRequest));
        });
      });
      return retryOriginalRequest;
    }
    return Promise.reject(error);
  }
);

// 유저 정보
export const UserApis = {
  login: (email, password) =>
    instance.post("api/member/login", { email, password }),
  signup: (email, nickname, password, passwordConfirm, profileImg) =>
    instance.post("api/member/signup", {
      email,
      nickname,
      password,
      passwordConfirm,
      profileImg,
    }),
  reload: () => instance.get("api/member/reload"),
};

// 챌린지 생성
export const ChallengeCreateApis = {
  GetThumnail: (category) => instance.get(`/api/category-image/${category}`),
  CreateChallenge: (challengeInfo) =>
    instance.post(`/api/member/challenge`, challengeInfo),
};

// 메인 화면
export const MainApis = {
  guestMain: () => instance.get(`api/guest/main`),
  userMain: () => instance.get(`api/member/main`),
  search: (searchWords) => instance.get(`api/guest/search/1/${searchWords}`),
  searchCategory: (categoryName) =>
    instance.get(`/api/guest/challenge/category/1/${categoryName}`),
  searchAll: () => instance.get(`/api/guest/challenge`),
};

// 인증샷 포스팅
export const PostApis = {
  getPost: (page, challengeId) =>
    instance.get(`api/posting/${page}/${challengeId}`),
  addPost: (new_post) => instance.post("api/posting", new_post),
  editPost: (post_id, post) =>
    instance.put(`api/posting/update/${post_id}`, post),
  deletePost: (post_id) => instance.delete(`api/posting/delete/${post_id}`),
  clickCheck: (check_info) => instance.post("api/certification", check_info),
};

// 챌린지 상세페이지
export const ChallengeDetailApis = {
  getDetail: (challenge_id) =>
    instance.get(`api/guest/challenge/${challenge_id}`),
  editDetail: (challengeInfo) =>
    instance.put(`api/member/challenge`, challengeInfo),
  adminDeleteDetail: (challenge_id) =>
    instance.delete(`api/admin/challenge/${challenge_id}`),
  deleteDetail: (challenge_id) =>
    instance.delete(`api/member/challenge/${challenge_id}`),
  giveupChallenge: (challenge_id) =>
    instance.delete(`api/member/challenge-give-up/${challenge_id}`),
  takeInPartChallenge: (challengeInfo) =>
    instance.post(`api/member/challenge-request`, challengeInfo),
};

// 마이 페이지
export const MypageApis = {
  editProfile: (proFile) => instance.put(`/api/member/mypage/profile`, proFile),
  getMyInfo: () => instance.get(`api/member/mypage`),
  getProceed: () => instance.get(`/api/member/mypage/proceed`),
  getEnd: () => instance.get(`/api/member/mypage/end`),
  getPoint: () => instance.get(`api/member/mypage/history`),
  changePassword: (password) =>
    instance.put(`/api/member/mypage/password`, password),
};

// 채팅방
export const ChatApis = {
  getMessages: (challenge_id) =>
    instance.get(`/sub/api/chatroom/${challenge_id}`),
};

export default instance;
