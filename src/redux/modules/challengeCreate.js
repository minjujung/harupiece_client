import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import instance from "../../shared/api";
import { consoleLogger } from "../configureStore";

const SET_PREVIEW = "SET_PREVIEW";
const GET_THUMNAIL = "GET_THUMNAIL";

const setPreview = createAction(SET_PREVIEW, (preview) => ({ preview }));
const getThumnail = createAction(GET_THUMNAIL, (list) => ({ list }));

const initialState = {
  thumnailList: [],
  preview: null,
};

// 대표이미지 가져오기
const getThumnailDb = (category) => {
  console.log(category);
  return function (dispatch, getState, { history }) {
    instance
      .get(`/api/category-image/${category}`)
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
  (setChallengeInfo) =>
  async (dispatch, getState, { history }) => {
    await instance
      .post(`/api/member/challenge`, {
        memberName: " ",
        challengeTitle: setChallengeInfo.challengeTitle,
        challengeContent: setChallengeInfo.challengeContent,
        categoryName: " ",
        challengePassword: setChallengeInfo.challengePassword,
        challengeStartDate: " ",
        challengeEndDate: " ",
        challengeProgress: " ",
        challengeImgUrl: " ",
        challengeGood: " ",
        challengeBad: " ",
        challengeHoliday: " ",
      })
      .then((res) => {
        consoleLogger(res);
      })
      .catch((error) => {
        if (window.confirm("blabal")) {
          history.push("/challenge");
        } else {
          history.goBack();
        }
        consoleLogger(error);
      });
  };

export default handleActions(
  {
    [SET_PREVIEW]: (state, action) =>
      produce(state, (draft) => {
        draft.preview = action.payload.preview;
      }),
    [GET_THUMNAIL]: (state, action) =>
      produce(state, (draft) => {
        draft.thumnailList = action.payload.list;
      }),
  },
  initialState
);

const actionCreators = {
  setPreview,
  getThumnailDb,
  createChDB,
};

export { actionCreators };
