import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import { deleteCookie, setCookie } from '../../shared/Cookie';
import { UserApis } from '../../shared/api';

// action
const LOGIN = 'user/LOGIN';
const LOGOUT = 'user/LOGOUT';
const SET_USER = "user/SET_USER";

// action creator
const setLogin = createAction(LOGIN, (user) => ({ user }));
const logOut = createAction(LOGOUT, (user) => ({ user }));
const setUser = createAction(SET_USER, (userInfo) => ({userInfo}))

const initialState = {
	isLogin: false,
	userInfo :{
		memberId: null,
		nickname: null,
		point: null,
		profileImg: null,
	}
};

// Thunk
const registerDB = (email, nick, pw, pwc ,profileImg) => {
	return function (dispatch, getState, { history }) {
		UserApis
		.signup(email, nick, pw, pwc ,profileImg)
		.then((res) => {
			history.push('/login');
		})
		.catch((err) => {
			console.log(err);
		});
	};
};

const setLoginDB = (email, pwd ) => {
	return function (dispatch, getState, { history }) {
		UserApis
			.login(email, pwd)
			.then((res) => {
				setCookie('token', res.data.accessToken, 7);
				dispatch(setUser(res.data.userInfo));
				history.replace('/');
			})
			.catch((err) => {
				console.log(err);
				window.alert('회원정보가 없습니다 회원가입을 해주세요!');
			});
	};
};

const logOutDB = () => {
	return function (dispatch, getState, { history }) {
		deleteCookie('token');
		dispatch(logOut());
		history.replace('/login');
	};
};

const loginCheckDB = () => {
	return function (dispatch, getState, { history }) {
		const tokenCheck = document.cookie;
		if (tokenCheck) {
			//인스턴스로 토큰 다시 보내기
		} else {
			dispatch(logOut());
		}
	};
};


export default handleActions(
	{
		[LOGIN]: (state, action) =>produce(state, (draft) => {
			draft.isLogin = true;
		}),
		[LOGOUT]: (state, action) => produce(state, (draft) => {
			draft.user = null;
			draft.isLogin = false;
		}),
		[SET_USER]: (state, action) =>produce(state, (draft) => {
			draft.userInfo = action.payload.userInfo;
		}),

	},
	initialState,
);

const userCreators = {
	registerDB,
	setLoginDB,
	logOutDB,
	loginCheckDB,
};


export { userCreators };