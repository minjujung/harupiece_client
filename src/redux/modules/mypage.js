import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import { MypageApis } from "../../shared/api";
import AWS from "aws-sdk";
import { userCreators } from "./user";
import { consoleLogger } from "../configureStore";

const GET_MYINFO = "GET_MYINFO";
const EDIT_MYPROFILE = "EDIT_MYPROFILE";
const SET_PREVIEW = "SET_PREVIEW";

const getInfo = createAction(GET_MYINFO, (myInfo, myChallenge) => ({
  myInfo,
  myChallenge,
}));
const editMyProfile = createAction(EDIT_MYPROFILE, (myInfo) => ({
  myInfo,
}));
const setPreview = createAction(SET_PREVIEW, (preview) => ({ preview }));

const initialState = {
  myInfo: {},
  preview: null,
};

const getMyInfoDB = () => {
  return function (dispatch, getState, { history }) {
    MypageApis.getMyInfo()
      .then((res) => dispatch(getInfo(res.data)))
      .catch((error) => {
        if (window.confirm("사용자 정보를 받아올수없습니다.")) {
          history.push("/");
        } else {
          history.goBack();
        }
        console.log(error);
      });
  };
};

const getProceedDB = () => {
  return function (dispatch, getState, { history }) {
    MypageApis.getProceed()
      .then((res) => dispatch(getInfo(res.data)))
      .catch((error) => {
        if (window.confirm("사용자 정보를 받아올수없습니다.")) {
          history.push("/");
        } else {
          history.goBack();
        }
        console.log(error);
      });
  };
};

const getEndDB = () => {
  return function (dispatch, getState, { history }) {
    MypageApis.getEnd()
      .then((res) => dispatch(getInfo(res.data)))
      .catch((error) => {
        if (window.confirm("사용자 정보를 받아올수없습니다.")) {
          history.push("/");
        } else {
          history.goBack();
        }
        console.log(error);
      });
  };
};

const getPointDB = () => {
  return function (dispatch, getState, { history }) {
    MypageApis.getPoint()
      .then((res) => {
        consoleLogger("point history 요청 후 응답", res);
        dispatch(getInfo(res.data));
      })
      .catch((error) => {
        if (window.confirm("포인트 정보를 찾을수가 없어요ㅜㅜ")) {
          history.push("/");
        } else {
          history.goBack();
        }
        console.log(error);
      });
  };
};

const editMyProfileDB = (content) => {
  return function (dispatch, getState, { history }) {
    const myProfileImg = getState().mypage.myInfo.profileImage;

    const blank_check = /[\s]/g;

    if (blank_check.test(content.newNickName)) {
      window.alert("공백은 사용할 수 없습니다!");
      return;
    }

    const proFile = {
      nickname: content.newNickName,
      profileImage: content.file,
    };

    if (content.file === myProfileImg) {
      MypageApis.editProfile(proFile)
        .then((res) => {
          consoleLogger("글 내용만 수정하고 server에 전송후 응답: ", res);
          const new_post = {
            ...proFile,
            nickname: content.newNickName,
            profileImage: myProfileImg,
          };

          dispatch(editMyProfile(new_post));

          const user_info = getState().user.userInfo;

          const new_user_info = {
            ...new_post,
            profileImg: new_post.profileImage,
            memberLevel: user_info.memberLevel,
            point: user_info.point,
          };
          dispatch(userCreators.setUser(new_user_info));
          dispatch(getMyInfoDB());
        })
        .catch((error) => {
          if (error.response?.data?.message) {
            window.alert(error.response?.data?.message);
          } else if (error) {
            window.alert(
              "프로필 수정 중 오류가 발생했습니다. 다시 한번 시도해주세요!"
            );
          }
          consoleLogger("사진은 그대로고 닉네임만 수정 했을 때: ", error);
        });
    } else {
      //프로필 사진, 닉네임 둘다 바꿀 때
      const date = new Date();
      const user_info = getState().user.userInfo;

      AWS.config.update({
        region: "ap-northeast-2",
        credentials: new AWS.CognitoIdentityCredentials({
          IdentityPoolId: `${process.env.REACT_APP_AWS_KEY}`,
        }),
      });

      const upload = new AWS.S3.ManagedUpload({
        params: {
          Bucket: "onedaypiece-shot-image",
          Key: `${user_info.memberId}_${date.getTime()}.jpg`,
          Body: content.file,
        },
      });

      const promise = upload.promise();
      promise
        .then((data) => {
          const newProFile = { ...proFile, profileImage: data.Location };

          MypageApis.editProfile(newProFile)
            .then((res) => {
              const _newProFile = { ...newProFile };

              dispatch(editMyProfile(_newProFile));

              const user_info = getState().user.userInfo;

              const new_user_info = {
                ...newProFile,
                profileImg: newProFile.profileImage,
                memberLevel: user_info.memberLevel,
                point: user_info.point,
              };
              dispatch(userCreators.setUser(new_user_info));
              dispatch(getMyInfoDB());
            })
            .catch((error) => {
              if (error.response?.data?.message) {
                window.alert(error.response?.data?.message);
              } else if (error) {
                window.alert(
                  "프로필 수정 중 오류가 발생했습니다. 다시 한번 시도해주세요!"
                );
              }
              consoleLogger("사진 닉네임 둘다 수정 했을 때: ", error);
            });
        })
        .catch((error) => {
          if (error.response?.data?.message) {
            window.alert(error.response?.data?.message);
          } else if (error) {
            window.alert(
              "이미지 업로드 중 오류가 발생했습니다. 다시 한번 시도해주세요!"
            );
          }
          consoleLogger("aws이미지 업로드: ", error);
        });
    }
  };
};

const changePasswordDB = (password) => {
  return function (dispatch, getState, { history }) {
    const passwordList = {
      currentPassword: password.oldPassword,
      newPassword: password.newPassword,
      newPasswordCheck: password.newPasswordConfirm,
    };
    MypageApis.changePassword(passwordList)
      .then((res) => {
        consoleLogger("비밀번호 변경 후 응답", res);
        window.alert("비밀번호 변경이 완료되었습니다!");
        history.replace("/");
      })
      .catch((error) => {
        if (
          error.response?.data?.message === "현재 비밀번호가 일치하지 않습니다."
        ) {
          window.alert(error.response?.data?.message);
        } else {
          window.alert(
            "비밀번호 변경 중 오류가 발생했어요! 새로고침 후 다시 시도해주세요!"
          );
        }
        console.log(error);
      });
  };
};

export default handleActions(
  {
    [GET_MYINFO]: (state, action) =>
      produce(state, (draft) => {
        let myInfo = action.payload.myInfo;
        if (myInfo.profileImage === "") {
          myInfo = {
            ...action.payload.myInfo,
            profileImage:
              "https://onedaypiece-shot-image.s3.ap-northeast-2.amazonaws.com/green.svg",
          };
        }
        draft.myInfo = myInfo;
      }),
    [EDIT_MYPROFILE]: (state, action) =>
      produce(state, (draft) => {
        draft.myInfo = action.payload.myInfo;
      }),
    [SET_PREVIEW]: (state, action) =>
      produce(state, (draft) => {
        draft.preview = action.payload.preview;
      }),
  },
  initialState
);

const actionCreators = {
  getInfo,
  editMyProfile,
  getMyInfoDB,
  editMyProfileDB,
  changePasswordDB,
  setPreview,
  getProceedDB,
  getEndDB,
  getPointDB,
};

export { actionCreators };
