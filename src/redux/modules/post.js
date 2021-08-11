import { createAction, handleActions } from "redux-actions";
import produce from "immer";

import { consoleLogger } from "../configureStore";
import { actionCreator as imageActions } from "./image";
import { PostApis } from "../../shared/api";

import AWS from "aws-sdk";

const RESET_POST = "RESET_POST";
const SET_POST = "SET_POST";
const ADD_POST = "ADD_POST";
const EDIT_POST = "EDIT_POST";
const DELETE_POST = "DELETE_POST";
const LOADING = "LOADING";

const resetPost = createAction(RESET_POST, (post_list, paging) => ({
  post_list,
  paging,
}));

const setPost = createAction(SET_POST, (post_list, paging) => ({
  post_list,
  paging,
}));
const addPost = createAction(ADD_POST, (post) => ({
  post,
}));
const editPost = createAction(EDIT_POST, (post_id, new_post) => ({
  post_id,
  new_post,
}));
const deletePost = createAction(DELETE_POST, (post_id) => ({ post_id }));
const loading = createAction(LOADING, (is_loading) => ({ is_loading }));

const initialState = {
  list: [
    // {
    //   postingId: 1,
    //   memberId: 1,
    //   nickName: "만주리아",
    //   profileImg:
    //     "https://user-images.githubusercontent.com/75834421/127079413-4362aacd-ce50-4576-8123-63cb36225d9e.png",
    //   postingImg:
    //     "https://user-images.githubusercontent.com/75834421/127076481-90fdc5d8-7461-4d87-83ef-608697e4f2eb.png",
    //   postingContent: "처음으로 해봤는 데 나름 괜찮았음",
    //   postingCount: 3,
    //   memberResponseDto: [],
    //   postingApproval: true,
    //   postingModifyOk: true,
    // },
  ],
  paging: { page: 1, next: null, size: 6 },
  is_loading: false,
};

//챌린지 상세 페이지에서 인증샷 목록 불러오기(InfinityScroll)
const getPostDB =
  (challengeId) =>
  (dispatch, getState, { history }) => {
    const _paging = getState().post.paging;
    console.log(_paging);

    if (_paging.page === false && _paging.next === false) {
      console.log("check shotlistpage");
      return;
    }

    dispatch(loading(true));

    PostApis.getPost(_paging.page, challengeId)
      .then((res) => {
        consoleLogger("인증샷 불러올때 응답", res);

        let new_paging = {
          page:
            res.data.postList.length < _paging.size ? false : _paging.page + 1,
          next: res.data.hasNext,
          size: _paging.size,
        };

        console.log(res.data.postList);
        dispatch(setPost(res.data.postList, new_paging));
      })
      .catch((error) => {
        if (
          window.confirm(
            "인증샷 목록을 불러오는데 실패했어요ㅜㅜ 메인화면으로 돌아가도 될까요?"
          )
        ) {
          history.push("/");
        } else {
          history.goBack();
        }
        consoleLogger("인증샷 목록 불러올 때: ", error);
      });
  };

//인증샷 올리기
const addPostDB =
  (post, challengeId) =>
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

    const upload = new AWS.S3.ManagedUpload({
      params: {
        Bucket: "onedaypiece-shot-image",
        Key: post.file.name + `${user_info.nickname}` + date + ".jpg",
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
          challengeId,
        };

        PostApis.addPost(new_post)
          .then((res) => {
            consoleLogger("인증샷 추가 요청 이후 응답", res);
            const _post = {
              ...new_post,
              postingId: res.data,
              memberId: user_info.memberId,
              nickname: user_info.nickname,
              profileImg: user_info.profileImg,
              postingCount: 0,
              memberResponseDto: [],
              postingApproval: true,
              postingModifyOk: true,
            };

            dispatch(addPost(_post));
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
            consoleLogger("인증샷 추가 요청했을 때: ", error);
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
        consoleLogger("새로운 인증샷 추가할 때: ", error);
      });
  };

const editPostDB =
  (post_id, content, challengeId) =>
  (dispatch, getState, { history }) => {
    console.log(new Date());
    const post_list = getState().post.list;
    const post_idx = post_list.findIndex((p) => p.postingId === post_id);
    const _post = post_list[post_idx];

    const post = {
      postingContent: content.shotText,
      postingImg: content.file,
    };

    if (content.file === _post.postingImg) {
      dispatch(loading(true));
      //사진이 전과 같을 때는 업로드 x
      PostApis.editPost(post_id, post)
        .then((res) => {
          consoleLogger("글 내용만 수정하고 server에 전송후 응답: ", res);
          const new_post = {
            ..._post,
            postingContent: content.shotText,
            postingImg: content.file,
          };
          dispatch(editPost(post_id, new_post));
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
          consoleLogger("사진은 그대로고 멘트만 수정 했을 때: ", error);
        });
    } else {
      // 사진이 전과 다를 때는 업로드
      const date = new Date();
      const user_info = getState().user.userInfo;

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
          Key: `${user_info.memberId}_${date.getTime()}`,
          Body: content.file,
        },
      });

      const promise = upload.promise();

      promise.then((data) => {
        consoleLogger(data);
        dispatch(imageActions.uploadImage(data.Location));

        const new_post = { ...post, postingImg: data.Location };

        PostApis.editPost(post_id, new_post)
          .then((res) => {
            consoleLogger("이미지 바꾼 수정 server에 전송후 응답: ", res);
            const _new_post = { ..._post, ...new_post };
            dispatch(editPost(post_id, _new_post));
          })
          .catch((error) => {
            if (
              window.confirm(
                "새로운 사진 업로드에 문제가 있습니다ㅜㅜ 메인화면으로 돌아가도 될까요?"
              )
            ) {
              history.push("/");
            } else {
              history.goBack();
            }
            consoleLogger("사진 새로운 걸로 수정 했을 때: ", error);
          });
      });
    }
  };

const deletePostDB =
  (post_id) =>
  (dispatch, getState, { history }) => {
    console.log(post_id);
    PostApis.deletePost(post_id)
      .then((res) => {
        consoleLogger("삭제 요청 server에게 보낸 후 응답: ", res);
        dispatch(deletePost(post_id));
      })
      .catch((error) => {
        if (
          window.confirm(
            "인증샷 삭제에 문제가 있습니다ㅜㅜ 메인화면으로 돌아가도 될까요?"
          )
        ) {
          history.push("/");
        } else {
          history.goBack();
        }
        consoleLogger("인증샷 삭제 했을 때: ", error);
      });
  };

//로그인한 사용자가 인증 버튼 눌렀을 때
const clickCheckDB =
  (post_id, totalNumber) =>
  (dispatch, getState, { history }) => {
    // user module 확인하고 다시 작성!
    const user_info = getState().user.userInfo;

    const check_info = {
      // memberId: user_info.memberId,
      postingId: post_id,
      totalNumber,
    };
    console.log(check_info);
    PostApis.clickCheck(check_info).then((res) => {
      consoleLogger("응답확인 버튼 클릭 server로 요청 보낸 후 응답: ", res);

      const post_list = getState().post.list;
      const idx = post_list.findIndex((l) => l.postingId === post_id);
      const _post = post_list[idx];

      if (_post.memberResponseDto.includes(user_info.memberId)) {
        window.alert("이미 인증 확인을 완료하신 게시물 입니다 :)");
      } else {
        const new_member_list = [
          ..._post.memberResponseDto,
          user_info.memberId,
        ];
        const new_post = {
          ..._post,
          memberResponseDto: new_member_list,
          postingCount: parseInt(_post.postingCount) + 1,
        };
        dispatch(editPost(post_id, new_post));
      }
    });
  };

export default handleActions(
  {
    [RESET_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.post_list;
        draft.paging = action.payload.paging;
        draft.is_loading = false;
      }),

    [SET_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list.push(...action.payload.post_list);
        draft.paging = action.payload.paging;
        draft.is_loading = false;
      }),

    [ADD_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list.unshift(action.payload.post);
        draft.is_loading = false;
      }),

    [EDIT_POST]: (state, action) =>
      produce(state, (draft) => {
        const idx = draft.list.findIndex(
          (l) => l.postingId === action.payload.post_id
        );
        draft.list[idx] = action.payload.new_post;
        draft.is_loading = false;
      }),

    [DELETE_POST]: (state, action) =>
      produce(state, (draft) => {
        const idx = draft.list.findIndex(
          (l) => l.postingId === action.payload.post_id
        );
        draft.list.splice(idx, 1);
      }),

    [LOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.is_loading = action.payload.is_loading;
      }),
  },
  initialState
);

const actionCreator = {
  resetPost,
  setPost,
  editPost,
  getPostDB,
  addPostDB,
  editPostDB,
  deletePostDB,
  clickCheckDB,
};

export { actionCreator };
