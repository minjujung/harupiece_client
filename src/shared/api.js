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
  config.headers.common["Authorization"] = `Bearer ${accessToken}`;
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
  EditProfile: () => instance.put(`/api/member/mypage`),
  GetMyChallenge: () => instance.get(`api/member/mypage`),
};

export default instance;
