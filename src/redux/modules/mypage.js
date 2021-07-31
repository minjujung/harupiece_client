import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import { MypageApis } from "../../shared/api";
import AWS from "aws-sdk";

const GET_MYINFO = "GET_MYINFO";
const EDIT_MYPROFILE = "EDIT_MYPROFILE";
// const CHANGE_PASSWORD = "CHANGE_PASSWORD";

const getInfo = createAction(GET_MYINFO, (myInfo, myChallenge) => ({
  myInfo,
  myChallenge,
}));
const editMyProfile = createAction(EDIT_MYPROFILE, (myInfo) => ({
  myInfo,
}));
// const changePassword = createAction(CHANGE_PASSWORD, () => ({}))

const initialState = {
  myInfo: {},
};

const getMyInfoDB = () => {
  return function (dispatch, getState, { history }) {
    MypageApis.GetMyInfo()
      .then((res) => dispatch(getInfo(res.data)))
      .catch((error) => {
        if (window.confirm("test")) {
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
    const myProfile = getState().mypage.myInfo.memberId;
    const myProfileImg = getState().mypage.myInfo.profileImg;

    const proFile = {
      memberId: myProfile,
      nickname: content.newNickName,
      profileImg: content.file,
      password: "",
    };

    if (content.file === myProfileImg) {
      MypageApis.EditProfile(proFile)
        .then((res) => {
          console.log("글 내용만 수정하고 server에 전송후 응답: ", res);
          const new_post = {
            ...proFile,
            nickname: content.newNickName,
            profileImg: content.file,
          };
          console.log(new_post);
          dispatch(editMyProfile(new_post));
        })
        .catch((error) => {
          if (
            window.confirm(
              "인증샷 수정에 문제가 있습니다ㅜㅜ 메인화면으로 돌아가도 될까요?"
            )
          ) {
            history.push("/");
          } else {
            history.goBack();
          }
          console.log("사진은 그대로고 멘트만 수정 했을 때: ", error);
        });
    } else {
      const date = new Date();

      AWS.config.update({
        region: "ap-northeast-2",
        credentials: new AWS.CognitoIdentityCredentials({
          IdentityPoolId: `${process.env.REACT_APP_AWS_KEY}`,
        }),
      });

      const upload = new AWS.S3.ManagedUpload({
        params: {
          Bucket: "onedaypiece-shot-image",
          Key: content.file + date + ".jpg",
          Body: content.file,
        },
      });

      const promise = upload.promise();
      promise.then((data) => {
        console.log(data);

        const newProFile = { ...proFile, profileImg: data.Location };
        console.log("프로필이미지" + newProFile.profileImg);

        MypageApis.EditProfile(newProFile)
          .then((res) => {
            console.log("프로필이미지" + newProFile.profileImg);
            const _newProFile = { ...newProFile };
            console.log(_newProFile);
            dispatch(editMyProfile(_newProFile));
          })
          .catch((error) => {
            if (window.confirm("test")) {
              history.push("/");
            } else {
              history.goBack();
            }
            console.log(error);
          });
      });
    }
  };
};

const changePasswordDB = (password) => {
  return function (dispatch, getState, { history }) {
    const passwordList = {
      currentPassword: password.password,
      newPassword: password.newPassword,
      newPasswordCheck: password.newPasswordConfirm,
    };
    MypageApis.ChangePassword(passwordList)
      .then((res) => console.log(res))
      .catch((error) => {
        if (window.confirm("test")) {
          // history.push("/");
        } else {
          // history.goBack();
        }
        console.log(error);
      });
  };
};

export default handleActions(
  {
    [GET_MYINFO]: (state, action) =>
      produce(state, (draft) => {
        draft.myInfo = action.payload.myInfo;
      }),
    [EDIT_MYPROFILE]: (state, action) =>
      produce(state, (draft) => {
        draft.myInfo = action.payload.myInfo;
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
};

export { actionCreators };
