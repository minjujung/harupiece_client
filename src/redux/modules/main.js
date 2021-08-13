import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import { MainApis } from "../../shared/api";

// action
const G_LOAD = "main/G_LOAD";
const M_LOAD = "main/M_LOAD";
const SEARCH = "SEARCH";
// const SEARCHALL = "SEARCHALL";
const ADD_M_LOAD = "main/ADD_M_LOAD";
const DELETE_M_LOAD = "main/DELETE_M_LOAD";

// action creator
const guestLoad = createAction(G_LOAD, (guestmain) => ({ guestmain }));
const userLoad = createAction(M_LOAD, (usermain) => ({ usermain }));
const search = createAction(SEARCH, (search) => ({ search }));
// const searchAll = createAction(SEARCHALL, (searchAll) => ({ searchAll }));
//로그인한 유저가 챌린지를 추가했을 때
const addUserLoad = createAction(ADD_M_LOAD, (challenge) => ({ challenge }));
//로그인한 유저가 챌린지를 삭제했을 때
const deleteUserLoad = createAction(
  DELETE_M_LOAD,
  (categoryName, challengeId) => ({
    categoryName,
    challengeId,
  })
);

// initialState

const initialState = {
  guestmain: [],
  usermain: [],
  search: [],
};

//유저가 로그인 안했을 때 메인에서 불러와야하는 것
const guestLoadDB = () => {
  return function (dispatch, getState, { history }) {
    MainApis.guestMain()
      .then((res) => {
        dispatch(guestLoad(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

//유저가 로그인 했을 때 메인에서 불러와야하는 것
const userLoadDB = () => {
  return function (dispatch, getState, { history }) {
    MainApis.userMain()
      .then((res) => {
        dispatch(userLoad(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

// 키워드 검색
const searchDB = (q) => {
  return function (dispatch, getState, { history }) {
    const encode = encodeURIComponent(q);
    MainApis.search(encode)
      .then((res) => {
        dispatch(search(res.data.result));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

// 메인화면 카테고리
const searchCategoryDB = (q) => {
  return function (dispatch, getState, { history }) {
    // let query = "";
    // if (q === "#금연금주") {
    //   query = "NODRINKNOSMOKE";
    // } else if (q === "#생활챌린지") {
    //   query = "LIVINGHABITS";
    // } else if (q === "#운동") {
    //   query = "EXERCISE";
    // } else {
    //   query = q;
    // }
    const encode = encodeURIComponent(q);
    MainApis.searchCategory(encode)
      .then((res) => {
        dispatch(search(res.data.result));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

// 모든 검색 결과
const searchAllDB = () => {
  return function (dispatch, getState, { history }) {
    MainApis.searchAll()
      .then((res) => {
        dispatch(search(res.data.content));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

// reducer
export default handleActions(
  {
    [G_LOAD]: (state, action) =>
      produce(state, (draft) => {
        draft.guestmain = action.payload.guestmain;
        draft.usermain = [];
      }),
    [M_LOAD]: (state, action) =>
      produce(state, (draft) => {
        draft.usermain = action.payload.usermain;
        draft.guestmain = [];
      }),
    [ADD_M_LOAD]: (state, action) =>
      produce(state, (draft) => {
        draft.usermain[
          action.payload.challenge.categoryName.toLowerCase()
        ]?.unshift(action.payload.challenge);
      }),
    [SEARCH]: (state, action) =>
      produce(state, (draft) => {
        draft.search = action.payload.search;
      }),
    [DELETE_M_LOAD]: (state, action) =>
      produce(state, (draft) => {
        const idx = draft.usermain[
          action.payload.categoryName.toLowerCase()
        ]?.findIndex((l) => l.challengeId === action.payload.challengeId);

        draft.usermain[action.payload.categoryName.toLowerCase()].splice(
          idx,
          1
        );
      }),
  },
  initialState
);

const MainCreators = {
  guestLoadDB,
  userLoadDB,
  userLoad,
  guestLoad,
  searchDB,
  addUserLoad,
  deleteUserLoad,
  searchAllDB,
  searchCategoryDB,
};

export { MainCreators };
