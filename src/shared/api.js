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
      if (error.response.data.message  === "TokenExpiredError") {
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
  login: (email, pw) => instance.post('api/member/login', {email: email, password: pw}),
	signup: (email, nick, pw, pwc, profileImg) => instance.post('api/member/signup', {email: email, nickname: nick , password: pw, passwordConfirm: pwc ,profileImg: profileImg}),
  reload: () => instance.get('api/member/reload'),
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

// 마이 페이지
export const MypageApis = {
  EditProfile: () => instance.put(`/api/member/mypage`),
  GetMyChallenge: () => instance.get(`api/member/mypage`),
};

export default instance;
