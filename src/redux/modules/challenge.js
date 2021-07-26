import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import instance from "../../shared/api";

const GET_CHALLENGE_DETAIL = "GET_CHALLNENG_DETAIL";

const getChallengeDetail = createAction(
  GET_CHALLENGE_DETAIL,
  (challengeId) => ({ challengeId })
);
