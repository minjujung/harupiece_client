import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import instance from "../../shared/api";
import { consoleLogger } from "../configureStore";

const GET_CHALLENGE_DETAIL = "GET_CHALLNENG_DETAIL";

const getChallengeDetail = createAction(GET_CHALLENGE_DETAIL, (challenge) => ({
  challenge,
}));

const initialState = {
  detail: {
    memberName: "만주리아", //챌린지 만든사람 이름
    challengeTitle: "하루에 한끼 비건식",
    challengeContent:
      "건강도 챙기고 맛도 챙기는 비건, 하루에 한번씩 실천해 보야요 :)",
    categoryName: "생활습관",
    challengePassword: "공개",
    challengeStartDate: "2021-07-26",
    challengeEndDate: "2021-08-02",
    challengeProgress: "진행중",
    challengeGood:
      "https://user-images.githubusercontent.com/75834421/127076439-599fa607-9285-4ab6-aec6-54ba16567434.png",
    challengeBad:
      "https://user-images.githubusercontent.com/75834421/127076583-de2aadb3-2dd2-4778-a59e-e68f9dc3aded.png",
    challengeHollyday: " ",
    challengeMember: [1, 2, 3, 4],
  }, //챌린지에 참여한 유저아이디
};

const getChallengeDetailDB =
  (challenge_id) =>
  (dispatch, getState, { history }) => {
    //챌린지 상세페이지에서 상세내용 불러오기
    instance
      .get(`/api/memeber/challenge/${challenge_id}`)
      .then((res) => {
        consoleLogger(res);
        dispatch(getChallengeDetail(res.data));
      })
      .catch((error) => {
        // if (
        //   window.confirm(
        //     "챌린지 상세내용을 불러오는데 실패했어요ㅜㅜ 메인화면으로 돌아가도 될까요?"
        //   )
        // ) {
        //   history.push("/");

        // } else {
        //   history.goback();
        // }
        consoleLogger(error);
      });
  };

export default handleActions(
  {
    [GET_CHALLENGE_DETAIL]: (state, action) =>
      produce(state, (draft) => {
        draft.detail = action.payload.challenge;
      }),
  },
  initialState
);

const actionCreator = {
  getChallengeDetailDB,
};

export { actionCreator };
