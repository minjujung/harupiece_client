import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import instance from "../../shared/api";
import { consoleLogger } from "../configureStore";
import { ChallengeCreateApis } from "../../shared/api";

const SET_GOODPREVIEW = "SET_GOODPREVIEW";
const SET_BADPREVIEW = "SET_BADPREVIEW";
const GET_THUMNAIL = "GET_THUMNAIL";

const setGoodPreview = createAction(SET_GOODPREVIEW, (preview) => ({
  preview,
}));
const setBadPreview = createAction(SET_BADPREVIEW, (preview) => ({ preview }));
const getThumnail = createAction(GET_THUMNAIL, (list) => ({ list }));

const initialState = {
  thumnailList: [],
  goodPreview: null,
  badPreview: null,
};

// 대표이미지 가져오기
const getThumnailDb = (category) => {
  return function (dispatch, getState, { history }) {
    ChallengeCreateApis.GetThumnail(category)
      .then((res) => dispatch(getThumnail(res.data.categoryImageUrl)))
      .catch((error) => {
        if (window.confirm("test")) {
          history.push("/");
        } else {
          history.goBack();
        }
        consoleLogger(error);
      });
  };
};

// 챌린지 생성
const createChDB =
  (challengeInfo) =>
  async (dispatch, getState, { history }) => {
    await ChallengeCreateApis.CreateChallenge(challengeInfo)
      .then((res) => {
        consoleLogger(res);
      })
      .catch((error) => {
        if (window.confirm(`${error}`)) {
          history.push("/challenge");
        } else {
          history.goBack();
        }
        consoleLogger(error);
      });
  };

export default handleActions(
  {
    [SET_GOODPREVIEW]: (state, action) =>
      produce(state, (draft) => {
        draft.goodPreview = action.payload.preview;
      }),
    [SET_BADPREVIEW]: (state, action) =>
      produce(state, (draft) => {
        draft.badPreview = action.payload.preview;
      }),
    [GET_THUMNAIL]: (state, action) =>
      produce(state, (draft) => {
        draft.thumnailList = action.payload.list;
      }),
  },
  initialState
);

const actionCreators = {
  setGoodPreview,
  setBadPreview,
  getThumnailDb,
  createChDB,
};

export { actionCreators };
