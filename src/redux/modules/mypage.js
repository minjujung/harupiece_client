import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import { MypageApis } from "../../shared/api";
import AWS from "aws-sdk";

const GET_MYINFO = "GET_MYINFO";
const EDIT_MYPROFILE = "EDIT_MYPROFILE";

const getInfo = createAction(GET_MYINFO, (myInfo, myChallenge) => ({
  myInfo,
  myChallenge,
}));
const editMyProfile = createAction(
  EDIT_MYPROFILE,
  (memberId, nickname, profileImg) => ({
    memberId,
    nickname,
    profileImg,
  })
);

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

const editMyProfileDB = (newNickName, file) => {
  return function (dispatch, getState, { history }) {
    const myProfile = getState().mypage.myInfo.memberId;

    const proFile = {
      memberId: myProfile,
      nickName: newNickName,
      profileImg: file,
      password: "",
    };

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
        Key: file.name + date + ".jpg",
        Body: file,
      },
    });

    const promise = upload.promise();
    promise.then((data) => {
      console.log(data);

      const newProFile = { ...proFile, profileImg: data.Location };

      MypageApis.EditProfile(myProfile, newProFile)
        .then((res) => {
          console.log(res);
          const _newProFile = { ...newProFile };
          dispatch(editMyProfile(myProfile, _newProFile));
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
  };
};

export default handleActions(
  {
    [GET_MYINFO]: (state, action) =>
      produce(state, (draft) => {
        draft.myInfo = action.payload.myInfo;
      }),
    [EDIT_MYPROFILE]: (state, action) => produce(state, (draft) => {}),
  },
  initialState
);

const actionCreators = {
  getInfo,
  editMyProfile,
  getMyInfoDB,
  editMyProfileDB,
};

export { actionCreators };
