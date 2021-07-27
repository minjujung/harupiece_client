import axios from "axios";

const instance = axios.create({
  baseURL: 'http://localhost:4000',
  headers: {
    "content-type": "application/json;charset=UTF-8",
    accept: "application/json,",
    // Authorization: `bearer ${accessToken}`,
  },
});

instance.interceptors.request.use(function (config) {
	// const accessToken = document.cookie.split('=')[1];
	// config.headers.common['Authorization'] = `${accessToken}`;
	return config;
});

export const UserApis = {
  login: (email, pw) => instance.post('/member/login', {email: email, password: pw}),
	signup: (email, nick, pw, pwc, profileImg) => instance.post('/member/signup', {email: email, nickname: nick , password: pw, passwordCheck: pwc ,profileImg: profileImg}),
};



export default instance;
