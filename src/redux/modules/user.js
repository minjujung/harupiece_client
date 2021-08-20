import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import { deleteCookie, setCookie, getCookie } from "../../shared/Cookie";
import { UserApis } from "../../shared/api";
import { MainCreators } from "./main";
import { consoleLogger } from "../configureStore";

// action
const LOGIN = "user/LOGIN";
const LOGOUT = "user/LOGOUT";
const SET_USER = "user/SET_USER";
const COMPLETE = "COMPLETE";

// action creator
const logOut = createAction(LOGOUT, (user) => ({ user }));
const setUser = createAction(SET_USER, (userInfo) => ({ userInfo }));
const complete = createAction(COMPLETE, (is_complete) => ({ is_complete }));

const initialState = {
  isLogin: false,
  is_complete: false,
  userInfo: {
    memberId: null,
    nickname: null,
    point: null,
    profileImg: null,
  },
};

// 회원가입
const registerDB = ({
  email,
  nickname,
  password,
  passwordConfirm,
  profileImg = "https://onedaypiece-shot-image.s3.ap-northeast-2.amazonaws.com/profileGreen.svg",
}) => {
  return function (dispatch, getState, { history }) {
    UserApis.signup(email, nickname, password, passwordConfirm, profileImg)
      .then((res) => {
        dispatch(complete(true));
      })
      .catch((error) => {
        if (error.response?.data?.message) {
          setTimeout(() => window.alert(error.response?.data?.message), 300);
        } else if (error) {
          setTimeout(
            () =>
              window.alert(
                "회원가입중 오류가 발생했습니다. 다시 한번 시도해주세요!"
              ),
            300
          );
        }
        consoleLogger("회원가입 요청 실패시 error: ", error);
      });
  };
};

//로그인
const setLoginDB = ({ email, password }) => {
  return function (dispatch, getState, { history }) {
    UserApis.login(email, password)
      .then((res) => {
        setCookie("token", res.data.accessToken, 1, "/");
        setCookie("refreshToken", res.data.refreshToken, 1, "/");
        dispatch(setUser(res.data.userInfo));
        dispatch(MainCreators.guestLoad(""));
        history.replace("/");
      })
      .catch((error) => {
        console.log(error);
        if (error.response) {
          if (error.response.status === 401) {
            setTimeout(
              () =>
                window.alert(
                  "아이디 또는 비밀번호가 일치하지 않습니다. 다시 한번 시도해주세요!"
                ),
              300
            );
          }
        }
        consoleLogger("로그인 요청 실패시 error: ", error);
      });
  };
};

//로그아웃
const logOutDB = () => {
  return function (dispatch, getState, { history }) {
    deleteCookie("token");
    deleteCookie("refreshToken");
    dispatch(logOut());
    dispatch(MainCreators.guestLoadDB());
    history.replace("/");
  };
};

//새로고침시 로그인 유지
const loginCheckDB = () => {
  return function (dispatch, getState, { history }) {
    const user_info = getState().user.userInfo;
    if (getCookie("token") && !user_info) {
      history.replace("/login");
    }

    UserApis.reload()
      .then((res) => {
        dispatch(setUser(res.data.userInfo));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export default handleActions(
  {
    [LOGIN]: (state, action) =>
      produce(state, (draft) => {
        draft.isLogin = true;
      }),
    [LOGOUT]: (state, action) =>
      produce(state, (draft) => {
        draft.userInfo = null;
        draft.isLogin = false;
      }),
    [SET_USER]: (state, action) =>
      produce(state, (draft) => {
        let myInfo = action.payload.userInfo;
        if (myInfo.profileImage === "") {
          myInfo = {
            ...action.payload.userInfo,
            profileImg:
              "https://onedaypiece-shot-image.s3.ap-northeast-2.amazonaws.com/green.svg",
          };
        }
        draft.userInfo = myInfo;
        draft.isLogin = true;
      }),
    [COMPLETE]: (state, action) =>
      produce(state, (draft) => {
        draft.is_complete = action.payload.is_complete;
      }),
  },
  initialState
);

const userCreators = {
  registerDB,
  setLoginDB,
  logOutDB,
  loginCheckDB,
  setUser,
  complete,
};

export { userCreators };
