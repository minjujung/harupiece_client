import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import { deleteCookie, setCookie } from '../../shared/Cookie';
import { UserApis } from '../../shared/api';

// action
const LOGIN = 'user/LOGIN';
const LOGOUT = 'user/LOGOUT';

// action creator
const setLogin = createAction(LOGIN, (user) => ({ user }));
const logOut = createAction(LOGOUT, (user) => ({ user }));

const initialState = {
	email: null,
	isLogin: false,
	profileImg : "",
};

// Thunk
const registerDB = (email, nick, pw, pwc ,profileImg) => {
	return function (dispatch, getState, { history }) {
		UserApis
		.signup(email, nick, pw, pwc ,profileImg)
		.then((res) => {
			console.log(res)
			history.push('/login');
		})
		.catch((err) => {
			console.log(err);
		});
	};
};

const setLoginDB = (email, pwd) => {
	return function (dispatch, getState, { history }) {
		UserApis
			.login(email, pwd)
			.then((res) => {
				setCookie('token', res.data[1].token, 7);
				localStorage.setItem('email', res.data[0].email);
				dispatch(setLogin({ email: email }));
				history.replace('/');
			})
			.catch((err) => {
				window.alert('회원정보가 없습니다 회원가입을 해주세요!');
			});
	};
};

const logOutDB = () => {
	return function (dispatch, getState, { history }) {
		deleteCookie('token');
		localStorage.removeItem('email');
		dispatch(logOut());
		history.replace('/login');
	};
};

const loginCheckDB = () => {
	return function (dispatch, getState, { history }) {
		const userEmail = localStorage.getItem('email');
		const tokenCheck = document.cookie;
		if (tokenCheck) {
			dispatch(setLogin({ email: userEmail }));
		} else {
			dispatch(logOut());
		}
	};
};


export default handleActions(
	{
		[LOGIN]: (state, action) =>produce(state, (draft) => {
			draft.user = action.payload.user;
			draft.isLogin = true;
		}),
		[LOGOUT]: (state, action) => produce(state, (draft) => {
			draft.user = null;
			draft.isLogin = false;
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