import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import { MainApis } from "../../shared/api";

// action
const G_LOAD = "main/G_LOAD";
const M_LOAD = "main/M_LOAD";
const SEARCH = "SEARCH";

// action creator
const guestLoad = createAction(G_LOAD, (guestmain) => ({ guestmain }));
const userLoad = createAction(M_LOAD, (usermain) => ({ usermain }));
const search = createAction(SEARCH, (search) => ({ search }));

// initialState

const initialState = {
  guestmain: [],
  usermain: [],
  search: [],
};

// Thunk function
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
    [SEARCH]: (state, action) =>
      produce(state, (draft) => {
        draft.search = action.payload.search;
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
};

export { MainCreators };
