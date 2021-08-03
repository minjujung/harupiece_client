import axios from "axios";
import { getCookie, multiCookie} from "./Cookie";

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

instance.interceptors.response.use((response) => {
  return response;
  },
  async (error) => {
    const {
      config,
      response: { status },
    } = error;
    if (status === 401) {
      if (error.response  === "Unauthorized") {
        const originalRequest = config;
        const refresh_token = getCookie("refreshToken");
        const token = getCookie("token");
        const { data } = await instance.post(
          `api/member/reissue`,
          {
            accessToken : token,
            refreshToken : refresh_token,
          }
        );
          const {
            accessToken,
            refreshToken,
          } = data;
          const accessCookie = {name: "token", value: accessToken} 
          const refreshCookie = {name: "refreshToken", value: refreshToken} 
          await multiCookie (accessCookie, refreshCookie)
          instance.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
          originalRequest.headers.common["Authorization"] = `Bearer ${accessToken}`;
        return instance(originalRequest);
      }
    }
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
};

export const PostApis = {
  getPost: (page, challengeId) =>
    instance.get(`api/posting/${page}/${challengeId}`),
  addPost: (new_post) => instance.post("api/posting", new_post),
  editPost: (post_id, post) =>
    instance.put(`api/posting/update/${post_id}`, post),
  deletePost: (post_id) => instance.delete(`api/posting/delete/${post_id}`),
  clickCheck: (check_info) => instance.post("api/certification", check_info),
};

export const ChallengeDetailApis = {
  getDetail: (challenge_id) =>
    instance.get(`api/member/challenge/${challenge_id}`),
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
  EditProfile: (proFile) => instance.put(`/api/member/mypage/profile`, proFile),
  GetMyInfo: () => instance.get(`api/member/mypage`),
  GetProceed: () => instance.get(`/api/member/mypage/proceed`),
  GetEnd: () => instance.get(`/api/member/mypage/end`),
  ChangePassword: (password) =>
    instance.put(`/api/member/mypage/password`, password),
};

export default instance;
