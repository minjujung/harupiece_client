import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import { MypageApis } from "../../shared/api";

const GET_MYCHALLENGE = "GET_MYCHALLENGE";
const EDIT_MYPROFILE = "EDIT_MYPROFILE";

const getMyChallenge = createAction(GET_MYCHALLENGE, () => ({}));
const editMyProfile = createAction(EDIT_MYPROFILE, () => ({}));

const initialState = {};

export default handleActions(
  {
    [GET_MYCHALLENGE]: (state, action) => produce(state, (draft) => {}),
    [EDIT_MYPROFILE]: (state, action) => produce(state, (draft) => {}),
  },
  initialState
);

const actionCreators = {
  getMyChallenge,
  editMyProfile,
};

export { actionCreators };
