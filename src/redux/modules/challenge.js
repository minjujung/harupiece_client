import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import instance from "../../shared/api";

const GET_CHALLENGE_DETAIL = "GET_CHALLNENG_DETAIL";

const getChallengeDetail = createAction(
  GET_CHALLENGE_DETAIL,
  (challengeId) => ({ challengeId })
);

const initialState = {
  detail: {},
};

// const getChallengeDetailDB = (challenge_id) => (dispatch, getState, {history}) => {

//     //챌린지 상세페이지에서 상세내용 불러오기
//     instance.get(`/api/memeber/challenge/${challenge_id}`).then(res =>

//     )
// }
