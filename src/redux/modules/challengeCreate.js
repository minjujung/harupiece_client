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
    dispatch(loading(true));
    ChallengeCreateApis.GetThumnail(category)
      .then((res) => dispatch(getThumnail(res.data.categoryImageUrl)))
      .catch((error) => {
        if (
          setTimeout(
            () =>
              window.confirm(
                "카테고리 썸네일을 가져오는 데 실패했어요ㅜㅜ 메인화면으로 돌아가도 될까요?"
              ),
            300
          )
        ) {
          history.push("/home");
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
    if (!window.confirm("정말로 챌린지를 개설하시겠어요?")) {
      return;
    }
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
        Key: `${user_info.memberId}_${date.getTime()}.jpg`,
        Body: challengeInfo.challengeGood,
      },
    });
    const upload2 = new AWS.S3.ManagedUpload({
      params: {
        Bucket: "onedaypiece-shot-image",
        Key: `${user_info.memberId}_${date.getDate()}.jpg`,
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
                  challengeMember: [
                    {
                      memberId: user_info.memberId,
                      profileImg: user_info.profileImg,
                      nickname: user_info.nickname,
                    },
                  ],
                };
                dispatch(MainCreators.addUserLoad(new_challenge));

                const new_userInfo = {
                  ...user_info,
                  challengeCount: parseInt(user_info.challengeCount) + 1,
                };
                dispatch(userCreators.setUser(new_userInfo));
                setTimeout(() => window.alert("챌린지 개설 완료!"), 300);
                history.push("/home");
              })
              .catch((error) => {
                if (
                  error.response?.data?.message ===
                  "이미 해당 카테고리에 챌린지를 생성한 유저입니다."
                ) {
                  setTimeout(
                    () =>
                      window.alert(
                        "이미 챌린지를 신청하셨거나 개설하신 카테고리 입니다!"
                      ),
                    300
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
        if (error) {
          setTimeout(
            () =>
              window.alert(
                "이미지 용량이 너무 커서 업로드에 문제가 생겼어요ㅜㅜ"
              ),
            300
          );
        }
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
        draft.is_loading = false;
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
