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
      challengeImgUrl: [
        "https://product-image.juniqe-production.juniqe.com/media/catalog/product/seo-cache/x800/773/59/773-59-101P/Lone-Penguin-Natural-Kingdom-Poster.jpg",

        "https://storage.googleapis.com/oceanwide_web/media-dynamic/cache/widen_900/media/default/0001/02/f59f65c73e71f27058a84be06341468b472b82e5.jpeg",

        "https://files.worldwildlife.org/wwfcmsprod/images/HERO_Penguins_Antarctica/hero_small/2tcsbqkcyj_Medium_WW267491.jpg",

        "https://i.ytimg.com/vi/Tcx6YyXvvRI/maxresdefault.jpg",

        "https://static01.nyt.com/images/2020/10/20/science/30TB-PENGUINS04/30TB-PENGUINS04-mediumSquareAt3X.jpg",

        "https://cms.bbcearth.com/sites/default/files/2020-12/2fkcp0000001000.jpg",
      ],
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
  createChDB,
};

export { actionCreators };
