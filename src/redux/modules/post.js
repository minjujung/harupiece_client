import { createAction, handleActions } from "redux-actions";
import produce from "immer";

import instance from "../../shared/api";
import { consoleLogger } from "../configureStore";
import { actionCreator as imageActions } from "./image";

import AWS from "aws-sdk";

const SET_POST = "SET_POST";
const ADD_POST = "ADD_POST";
const EDIT_POST = "EDIT_POST";
const LOADING = "LOADING";

const setPost = createAction(SET_POST, (post_list, paging) => ({
  post_list,
  paging,
}));
const addPost = createAction(ADD_POST, (post) => ({
  post,
}));
const editPost = createAction(EDIT_POST, (post_id, content) => ({
  post_id,
  content,
}));
const loading = createAction(LOADING, (is_loading) => ({ is_loading }));

const initialState = {
  list: [
    {
      postingId: 1,
      memberId: 1,
      nickName: "만주리아",
      profileImg:
        "https://user-images.githubusercontent.com/75834421/127079413-4362aacd-ce50-4576-8123-63cb36225d9e.png",
      postingImg:
        "https://user-images.githubusercontent.com/75834421/127076481-90fdc5d8-7461-4d87-83ef-608697e4f2eb.png",
      postingContent: "처음으로 해봤는 데 나름 괜찮았음",
      postingCount: 3,
      postingApproval: true,
      postingModifyOk: true,
    },
    {
      postingId: 2,
      memberId: 2,
      nickName: "비건린이",
      profileImg:
        "https://user-images.githubusercontent.com/75834421/127079413-4362aacd-ce50-4576-8123-63cb36225d9e.png",
      postingImg:
        "https://user-images.githubusercontent.com/75834421/127076499-50a96a41-7b5f-45fb-84ea-5166666bde3e.png",
      postingContent: "난 이게 체질이 맞는 것 같아요!",
      postingCount: 2,
      postingApproval: true,
      postingModifyOk: true,
    },
    {
      postingId: 3,
      memberId: 3,
      nickName: "구슬을 모을테야",
      profileImg:
        "https://user-images.githubusercontent.com/75834421/127079413-4362aacd-ce50-4576-8123-63cb36225d9e.png",
      postingImg:
        "https://user-images.githubusercontent.com/75834421/127076537-33e58cc5-5fcf-4203-ad0e-a49b9027c07a.png",
      postingContent: "힘드네요...그래도 계속 해야지",
      postingCount: 1,
      postingApproval: true,
      postingModifyOk: true,
    },
  ],
  paging: { start: null, next: null, size: 6, page: 1 },
  is_loading: false,
};

//챌린지 상세 페이지에서 인증샷 목록 불러오기
const getPostDB =
  (challengeId, start = null, size = 6) =>
  (dispatch, getState, { history }) => {
    let _paging = getState().post.paging;
    let page = _paging.page;

    //start는 있는데 next가 없다는 건 더이상 가져올 인증샷이
    //없다는 의미이므로 목록을 불러오지 않음!
    if (_paging.start && !_paging.next) {
      return;
    }

    //가져올게 있으면 loading 중이되므로 loading = true
    dispatch(loading(true));

    if (start) {
      page = page + 1;
    }

    instance
      .get(`/api/posting/${page}/${challengeId}`)
      .then((res) => {
        consoleLogger(res);
        let post_list = [];

        let paging = {
          start: res.data[0],
          next:
            res.data.length === size + 1 ? res.data[res.data.length - 1] : null,
          size,
          page,
        };

        post_list.push(...res.data);
        post_list.pop();
        dispatch(setPost(post_list, paging));
      })
      .catch((error) => {
        // if (
        //   window.confirm(
        //     "인증샷 목록을 불러오는데 실패했어요ㅜㅜ 메인화면으로 돌아가도 될까요?"
        //   )
        // ) {
        //   history.push("/");
        // } else {
        //   history.goBack();
        // }
        consoleLogger(error);
      });
  };

const addPostDB =
  (post) =>
  (dispatch, getState, { history }) => {
    const date = new Date();

    AWS.config.update({
      region: "ap-northeast-2",
      credentials: new AWS.CognitoIdentityCredentials({
        IdentityPoolId: `${process.env.REACT_APP_AWS_KEY}`,
      }),
    });

    dispatch(loading(true));

    const upload = new AWS.S3.ManagedUpload({
      params: {
        Bucket: "onedaypiece-shot-image",
        Key: post.file.name + date + ".jpg",
        Body: post.file,
      },
    });
    const promise = upload.promise();
    promise
      .then((data) => {
        consoleLogger(data);
        dispatch(imageActions.uploadImage(data.Location));

        let new_post = {
          postingImg: data.Location,
          postingContent: post.shotText,
          postingCount: 0,
          postingApproval: false,
          postingModifyOk: true,
        };

        instance
          .post("/api/posting", new_post)
          .then((res) => {
            consoleLogger(res);
            dispatch(addPost({ ...new_post, postingId: res.postingId }));
            dispatch(imageActions.setPreview(null));
          })
          .catch((error) => {
            if (
              window.confirm(
                "인증샷 등록에 문제가 있습니다ㅜㅜ 메인화면으로 돌아가도 될까요?"
              )
            ) {
              history.push("/");
            } else {
              history.goBack();
            }
            consoleLogger(error);
          });
      })
      .catch((error) => {
        if (
          window.confirm(
            "이미지 업로드에 문제가 있습니다ㅜㅜ 메인화면으로 돌아가도 될까요?"
          )
        ) {
          history.push("/");
        } else {
          history.goBack();
        }
        consoleLogger(error);
      });
  };

// const editPostDB =
//   (post_id, content) =>
//   (dispatch, getState, { history }) => {
//     const post_list = getState().post.list;
//     const post_idx = post_list.findIndex((p) => p.postingId === post_id);
//     const _post = post_list[post_idx]

//     let post = {..._post, ...content}
//     instance.put(`/api/posting/update/${post_id}`).then(res =>{
//       consoleLogger(res)

//     })

//   };
export default handleActions(
  {
    [SET_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list.push(...action.payload.post_list);

        draft.list = draft.list.reduce((acc, cur) => {
          if (acc.findIndex((a) => a.id === cur.id) === -1) {
            return [...acc, cur];
          } else {
            acc[acc.findIndex((a) => a.id === cur.id)] = cur;
            return acc;
          }
        }, []);

        if (action.payload.paging) {
          draft.paging = action.payload.paging;
        }

        draft.is_loading = false;
      }),

    [ADD_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list.unshift(action.payload.post);
        draft.is_loading = false;
      }),

    [LOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.is_loading = action.payload.is_loading;
      }),
  },
  initialState
);

const actionCreator = {
  getPostDB,
  addPostDB,
};

export { actionCreator };
