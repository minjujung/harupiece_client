import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import { MypageApis } from "../../shared/api";

const GET_MYINFO = "GET_MYINFO";
const EDIT_MYPROFILE = "EDIT_MYPROFILE";

const getInfo = createAction(GET_MYINFO, (myInfo, myChallenge) => ({
  myInfo,
  myChallenge,
}));
const editMyProfile = createAction(EDIT_MYPROFILE, () => ({}));

const initialState = {
  myInfo: {},
};

const getMyInfoDB = () => {
  return function (dispatch, getState, { history }) {
    MypageApis.GetMyInfo()
      .then((res) => dispatch(getInfo(res.data)))
      .catch((error) => {
        if (window.confirm("test")) {
          history.push("/");
        } else {
          history.goBack();
        }
        console.log(error);
      });
  };
};

const editMyProfileDB = () => {
  return function (dispatch, getState, { history }) {
    MypageApis.EditProfile()
      .then((res) => console.log(res))
      .catch((error) => {
        if (window.confirm("test")) {
          history.push("/");
        } else {
          history.goBack();
        }
        console.log(error);
      });
  };
};

export default handleActions(
  {
    [GET_MYINFO]: (state, action) =>
      produce(state, (draft) => {
        draft.myInfo = action.payload.myInfo;
      }),
    [EDIT_MYPROFILE]: (state, action) => produce(state, (draft) => {}),
  },
  initialState
);

const actionCreators = {
  getInfo,
  editMyProfile,
  getMyInfoDB,
  editMyProfileDB,
};

export { actionCreators };
