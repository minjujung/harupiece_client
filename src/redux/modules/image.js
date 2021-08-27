import { createAction, handleActions } from "redux-actions";
import produce from "immer";

import AWS from "aws-sdk";
import { consoleLogger } from "../configureStore";

const UPLOADING = "UPLOADING";
const UPLOAD_IMAGE = "UPLOAD_IMAGE";
const SET_PREVIEW = "SET_PREVIEW";

const uploading = createAction(UPLOADING, (uploading) => ({ uploading }));
const uploadImage = createAction(UPLOAD_IMAGE, (image_url) => ({ image_url }));
const setPreview = createAction(SET_PREVIEW, (preview) => ({ preview }));

const initailState = {
  image_url: "",
  uploading: false,
  preview: null,
};

const uploadImageDB =
  (file) =>
  (dispatch, getState, { history }) => {
    const date = new Date();

    AWS.config.update({
      region: "ap-northeast-2",
      credentials: new AWS.CognitoIdentityCredentials({
        IdentityPoolId: `${process.env.REACT_APP_AWS_KEY}`,
      }),
    });

    dispatch(uploading(true));

    const upload = new AWS.S3.ManagedUpload({
      params: {
        Bucket: "onedaypiece-shot-image",
        Key: file.name + date + ".jpg",
        Body: file,
      },
    });
    const promise = upload.promise();
    promise
      .then((data) => {
        consoleLogger(data);
        dispatch(uploadImage(data.Location));
      })
      .catch((error) => {
        if (
          window.confirm(
            "이미지 업로드에 문제가 있습니다ㅜㅜ 메인화면으로 돌아가도 될까요?"
          )
        ) {
          history.push("/home");
        } else {
          history.goBack();
        }
        consoleLogger(error);
      });
  };

export default handleActions(
  {
    [UPLOAD_IMAGE]: (state, action) =>
      produce(state, (draft) => {
        draft.image_url = action.payload.image_url;
        draft.uploading = false;
      }),

    [UPLOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.uploading = action.payload.uploading;
      }),

    [SET_PREVIEW]: (state, action) =>
      produce(state, (draft) => {
        draft.preview = action.payload.preview;
      }),
  },
  initailState
);

const actionCreator = {
  uploadImageDB,
  setPreview,
  uploadImage,
};

export { actionCreator };
