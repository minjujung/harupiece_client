import { createAction, handleActions } from "redux-actions";
import produce from "immer";

import { consoleLogger } from "../configureStore";
import { ChallengeCreateApis } from "../../shared/api";
import { MainCreators } from "./main";
import { userCreators } from "./user";

import AWS from "aws-sdk";

const SET_GOODPREVIEW = "SET_GOODPREVIEW";
const SET_BADPREVIEW = "SET_BADPREVIEW";
const GET_THUMNAIL = "GET_THUMNAIL";
const LOADING = "LOADING";

const setGoodPreview = createAction(SET_GOODPREVIEW, (preview) => ({
  preview,
}));
const setBadPreview = createAction(SET_BADPREVIEW, (preview) => ({ preview }));
const getThumnail = createAction(GET_THUMNAIL, (list) => ({ list }));
const loading = createAction(LOADING, (is_loading) => ({ is_loading }));

const initialState = {
  thumnailList: [],
  goodPreview: null,
  badPreview: null,
  is_loading: false,
};

// 대표이미지 가져오기
const getThumnailDb = (category) => {
  return function (dispatch, getState, { history }) {
    ChallengeCreateApis.GetThumnail(category)
      .then((res) => dispatch(getThumnail(res.data.categoryImageUrl)))
      .catch((error) => {
        if (
          window.confirm(
            "카테고리 썸네일을 가져오는 데 실패했어요ㅜㅜ 메인화면으로 돌아가도 될까요?"
          )
        ) {
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
  (challengeInfo) =>
  (dispatch, getState, { history }) => {
    const date = new Date();
    const user_info = getState().user.userInfo;

    AWS.config.update({
      region: "ap-northeast-2",
      credentials: new AWS.CognitoIdentityCredentials({
        IdentityPoolId: `${process.env.REACT_APP_AWS_KEY}`,
      }),
    });

    dispatch(loading(true));

    const upload1 = new AWS.S3.ManagedUpload({
      params: {
        Bucket: "onedaypiece-shot-image",
        Key:
          challengeInfo.challengeGood.name +
          `${user_info.nickname}` +
          date +
          ".jpg",
        Body: challengeInfo.challengeGood,
      },
    });
    const upload2 = new AWS.S3.ManagedUpload({
      params: {
        Bucket: "onedaypiece-shot-image",
        Key:
          challengeInfo.challengeBad.name +
          `${user_info.nickname}` +
          date +
          ".jpg",
        Body: challengeInfo.challengeBad,
      },
    });

    const promise1 = upload1.promise();
    const promise2 = upload2.promise();

    promise1
      .then((data) => {
        challengeInfo = { ...challengeInfo, challengeGood: data.Location };
        promise2
          .then((data) => {
            consoleLogger("두번째 이미지 업로드", data);
            challengeInfo = { ...challengeInfo, challengeBad: data.Location };
            consoleLogger("db로 보내기전 challengeInfo", challengeInfo);

            ChallengeCreateApis.CreateChallenge(challengeInfo)
              .then((res) => {
                consoleLogger("챌린지 개설 요청 후 응답", res);

                const user_info = getState().user.userInfo;

                const new_challenge = {
                  ...challengeInfo,
                  challengeId: res.data,
                  challengeMember: [user_info.memberId],
                };
                dispatch(MainCreators.addUserLoad(new_challenge));

                const new_userInfo = {
                  ...user_info,
                  challengeCount: parseInt(user_info.challengeCount) + 1,
                };
                dispatch(userCreators.setUser(new_userInfo));
                window.alert("챌린지 개설 완료!");
                history.push("/");
              })
              .catch((error) => {
                if (
                  error.response?.data?.message ===
                  "이미 해당 카테고리에 챌린지를 생성한 유저입니다."
                ) {
                  window.alert(
                    "한 사람당 카테고리 별로 하나씩만 챌린지 생성이 가능해요!!"
                  );
                }
                consoleLogger("챌린지 생성 요청시 error: ", error);
              });
          })
          .catch((error) => {
            consoleLogger("나쁜 예시 이미지 에러", error);
          });
      })
      .catch((error) => {
        consoleLogger("좋은 예시 이미지 에러", error);
      });
  };

export default handleActions(
  {
    [SET_GOODPREVIEW]: (state, action) =>
      produce(state, (draft) => {
        draft.goodPreview = action.payload.preview;
      }),
    [SET_BADPREVIEW]: (state, action) =>
      produce(state, (draft) => {
        draft.badPreview = action.payload.preview;
      }),
    [GET_THUMNAIL]: (state, action) =>
      produce(state, (draft) => {
        draft.thumnailList = action.payload.list;
      }),
    [LOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.is_loading = action.payload.is_loading;
      }),
  },
  initialState
);

const actionCreators = {
  setGoodPreview,
  setBadPreview,
  getThumnailDb,
  createChDB,
};

export { actionCreators };
