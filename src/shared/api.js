import axios from "axios";

const instance = axios.create({
  baseURL: "http://54.180.141.39/",
  headers: {
    "content-type": "application/json;charset=UTF-8",
    accept: "application/json,",
  },
});

instance.interceptors.request.use(function (config) {
  const accessToken = document.cookie.split("=")[1];
  config.headers.common["Authorization"] = ` Bearer ${accessToken}`;
  return config;
});

// 유저 정보
export const UserApis = {
  login: (email, pw) =>
    instance.post("api/member/login", { email: email, password: pw }),
  signup: (email, nick, pw, pwc, profileImg) =>
    instance.post("api/member/signup", {
      email: email,
      nickname: nick,
      password: pw,
      passwordConfirm: pwc,
      profileImg: profileImg,
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
