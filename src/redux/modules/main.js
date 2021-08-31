import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import { MainApis } from "../../shared/api";
import { consoleLogger } from "../configureStore";

// action
const G_LOAD = "main/G_LOAD";
const M_LOAD = "main/M_LOAD";
const SEARCH = "SEARCH";
const ADD_M_LOAD = "main/ADD_M_LOAD";
const DELETE_M_LOAD = "main/DELETE_M_LOAD";
const LOADING = "LOADING";

// action creator
const guestLoad = createAction(G_LOAD, (guestmain) => ({ guestmain }));
const userLoad = createAction(M_LOAD, (usermain) => ({ usermain }));
const search = createAction(SEARCH, (search, paging) => ({ search, paging }));
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
const loading = createAction(LOADING, (is_loading) => ({ is_loading }));

// initialState

const initialState = {
  guestmain: [],
  usermain: [],
  search: [],
  paging: { page: 1, next: null, size: 8 },
  is_loading: false,
};

//유저가 로그인 안했을 때 메인에서 불러와야하는 것
const guestLoadDB = () => {
  return function (dispatch, getState, { history }) {
    MainApis.guestMain()
      .then((res) => {
        const adver = {
          categoryName: "advertisement1",
          challengeEndDate: "2021-09-05T23:59:57",
          challengeId: 999,
          challengeImgUrl: "https://i.ibb.co/XXJxC97/banner-gift-min.png",
          challengeMobileImgUrl:
            "https://i.ibb.co/T0hfYBS/banner-gift-m-min.png",
          challengeMember: [],
          challengeStartDate: "2021-08-30T00:00:00",
          challengeTitle: "광고",
          tag: "광고",
        };

        const adver2 = {
          categoryName: "advertisement2",
          challengeEndDate: "2021-09-05T23:59:57",
          challengeId: 998,
          challengeImgUrl: "https://i.ibb.co/WGRCfTM/banner-survey-min.png",
          challengeMobileImgUrl:
            "https://i.ibb.co/Wz0gP2F/banner-survey-m-min.png",
          challengeMember: [],
          challengeStartDate: "2021-08-30T00:00:00",
          challengeTitle: "광고",
          tag: "광고",
        };

        const grade = {
          categoryName: "information",
          challengeEndDate: "2021-09-05T23:59:57",
          challengeId: 997,
          challengeImgUrl: "https://i.ibb.co/m4cggTk/banner-07-1-min.png",
          challengeMobileImgUrl: "https://i.ibb.co/zHJfRpK/7-1-min.png",
          challengeMember: [],
          challengeStartDate: "2021-08-30T00:00:00",
          challengeTitle: "광고",
          tag: "광고",
        };
        res.data.slider.unshift(adver, adver2, grade);
        dispatch(guestLoad(res.data));
      })
      .catch((err) => {
        consoleLogger(err);
      });
  };
};

// 키워드 검색
const searchDB = (q) => {
  return function (dispatch, getState, { history }) {
    const _paging = getState().post.paging;

    if (_paging.page === false && _paging.next === false) {
      return;
    }

    const encode = encodeURIComponent(q);

    dispatch(loading(true));

    MainApis.search(encode, _paging.page)
      .then((res) => {
        let new_paging = {
          page:
            res.data.postList?.length < _paging.size ? false : _paging.page + 1,
          next: res.data.hasNext,
          size: _paging.size,
        };

        dispatch(search(res.data.challengeList, new_paging));
      })
      .catch((err) => {
        consoleLogger(err);
      });
  };
};

// 필터링
const searchFilterDB = (content, keyWord) => {
  return function (dispatch, getState, { history }) {
    const _paging = getState().main.paging;

    if (_paging.page === false && _paging.next === false) {
      return;
    }

    dispatch(loading(true));

    // let searchWords = "all";
    let categoryName = "ALL";
    let period = 0;
    let progress = 0;

    // if (keyWord) {
    //   searchWords = keyWord;
    // } else {
    //   return;
    // }

    if (content) {
      if (content.tags === "1") {
        period = 1;
      } else if (content.tags === "2") {
        period = 2;
      } else if (content.tags === "3") {
        period = 3;
      } else if (content.tags === "4") {
        period = 4;
      } else {
        period = 0;
      }

      if (content.categoryName === "NODRINKNOSMOKE") {
        categoryName = "NODRINKNOSMOKE";
      } else if (content.categoryName === "EXERCISE") {
        categoryName = "EXERCISE";
      } else if (content.categoryName === "LIVINGHABITS") {
        categoryName = "LIVINGHABITS";
      } else {
        categoryName = "ALL";
      }

      if (content.progress === "1") {
        progress = 1;
      } else if (content.progress === "2") {
        progress = 2;
      } else {
        progress = 0;
      }
    }

    // const encodeSearchWords = encodeURIComponent(searchWords);
    const encodeCategoryName = encodeURIComponent(categoryName);
    const encodePeriod = encodeURIComponent(period);
    const encodeProgress = encodeURIComponent(progress);

    if (
      encodeCategoryName === "ALL" &&
      encodePeriod === 0 &&
      encodeProgress === 0
    ) {
      MainApis.allChallenge(_paging.page)
        .then((res) => {
          let new_paging = {
            page:
              res.data.challengeList?.length < _paging.size
                ? false
                : _paging.page + 1,
            next: res.data.hasNext,
            size: _paging.size,
          };

          dispatch(search(res.data.challengeList, new_paging));
        })
        .catch((err) => {
          consoleLogger(err);
        });
    }
    MainApis.searchFilter(
      // encodeSearchWords,
      encodeCategoryName,
      encodePeriod,
      encodeProgress,
      _paging.page
    )
      .then((res) => {
        let new_paging = {
          page:
            res.data.challengeList?.length < _paging.size
              ? false
              : _paging.page + 1,
          next: res.data.hasNext,
          size: _paging.size,
        };
        dispatch(search(res.data.challengeList, new_paging));
      })
      .catch((err) => {
        consoleLogger(err);
      });
  };
};

// reducer
export default handleActions(
  {
    [G_LOAD]: (state, action) =>
      produce(state, (draft) => {
        draft.guestmain = action.payload.guestmain;
        draft.is_loading = false;
      }),
    [ADD_M_LOAD]: (state, action) =>
      produce(state, (draft) => {
        draft.usermain[
          action.payload.challenge.categoryName.toLowerCase()
        ]?.unshift(action.payload.challenge);
      }),
    [SEARCH]: (state, action) =>
      produce(state, (draft) => {
        action.payload.search.length < action.payload.paging.size
          ? (draft.search = action.payload.search)
          : draft.search.push(...action.payload.search);
        draft.paging = action.payload.paging;
        draft.is_loading = false;
      }),
    [DELETE_M_LOAD]: (state, action) =>
      produce(state, (draft) => {
        const idx = draft.usermain[
          action.payload.categoryName.toLowerCase()
        ]?.findIndex((l) => l.challengeId === action.payload.challengeId);

        draft.usermain[action.payload.categoryName.toLowerCase()]?.splice(
          idx,
          1
        );
      }),

    [LOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.is_loading = action.payload.is_loading;
      }),
  },
  initialState
);

const MainCreators = {
  guestLoadDB,
  userLoad,
  guestLoad,
  searchDB,
  addUserLoad,
  deleteUserLoad,
  searchFilterDB,
  loading,
  // allCategoryDB,
};

export { MainCreators };
