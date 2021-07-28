import axios from "axios";

const instance = axios.create({
  baseURL: 'http://54.180.141.39/',
  headers: {
    "content-type": "application/json;charset=UTF-8",
    accept: "application/json,",
  },
});

instance.interceptors.request.use(function (config) {
	const accessToken = document.cookie.split('=')[1];
	config.headers.common['Authorization'] = `${accessToken}`;
	return config;
});

export const UserApis = {
  login: (email, pw) => instance.post('api/member/login', {email: email, password: pw}),
	signup: (email, nick, pw, pwc, profileImg) => instance.post('api/member/signup', {email: email, nickname: nick , password: pw, passwordConfirm: pwc ,profileImg: profileImg}),
};

export const MainApis = {
  guestMain : () => instance.get(`api/guest/main`),
  userMain : () => instance.get(`api/member/main`),
};



export default instance;
