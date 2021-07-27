import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import instance from "../../shared/api";
import { consoleLogger } from "../configureStore";

const SET_PREVIEW = "SET_PREVIEW";
const GET_THUMNAIL = "GET_THUMNAIL";

const setPreview = createAction(SET_PREVIEW, (preview) => ({ preview }));
const getThumnail = createAction(GET_THUMNAIL, (list) => ({ list }));

const initialState = {
  thumnailList: [
    {
      categoryName: "공부",
      challengeImgUrl: "",
    },
  ],
  preview: null,
};

// 대표이미지 가져오기
const getThumnailDb = () => {
  return function (dispatch, getState, { history }) {
    instance
      .get()
      .then((res) => console.log(res))
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
  () =>
  async (dispatch, getState, { history }) => {
    await instance
      .post(``, {
        memberName: " ",
        challengeTitle: " ",
        challengeContent: " ",
        categoryName: " ",
        challengePassword: " ",
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
          history.push("/");
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
        draft.thumnailList = action.payload.thumnailList;
      }),
  },
  initialState
);

const actionCreators = {
  setPreview,
};

export { actionCreators };
