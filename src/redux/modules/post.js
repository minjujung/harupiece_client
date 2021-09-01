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
    {
      createdAt: "2021-08-26T23:18:01",
      memberId: 6,
      memberResponseDto: [6],
      modifiedAt: "2021-08-26T23:18:01",
      nickName: "minju22",
      postingApproval: false,
      postingContent:
        "2주만에 열심히 뛰었다\n근육이 떨어질것 같다\n오늘 부터 하루도 빠짐없이\n달릴테야!",
      postingCount: 1,
      postingId: 12,
      postingImg:
        "https://onedaypiece-shot-image.s3.ap-northeast-2.amazonaws.com/manjuriaThu%20Aug%2026%202021%2023%3A18%3A00%20GMT%2B0900%20%28%ED%95%9C%EA%B5%AD%20%ED%91%9C%EC%A4%80%EC%8B%9C%29.jpg",
      postingModifyOk: false,
      profileImg:
        "https://onedaypiece-shot-image.s3.ap-northeast-2.amazonaws.com/gray.svg",
    },
  ],
  paging: { page: 1, next: null, size: 6 },
  is_loading: false,
};

//챌린지 상세 페이지에서 인증샷 목록 불러오기(InfinityScroll)
const getPostDB =
  (challengeId) =>
  (dispatch, getState, { history }) => {
    const _paging = getState().post.paging;

    if (_paging.page === false && _paging.next === false) {
      return;
    }

    dispatch(loading(true));

    PostApis.getPost(_paging.page, challengeId)
      .then((res) => {
        consoleLogger("인증샷 불러올때 응답", res);

        let new_paging = {
          page:
            res.data.postList?.length < _paging.size ? false : _paging.page + 1,
          next: res.data.hasNext,
          size: _paging.size,
        };

        dispatch(setPost(res.data.postList, new_paging));
      })
      .catch((error) => {
        if (
          window.confirm(
            "인증샷 목록을 불러오는데 실패했어요ㅜㅜ 메인화면으로 돌아가도 될까요?"
          )
        ) {
          history.push("/home");
        } else {
          history.goBack();
        }
        consoleLogger("인증샷 목록 불러올 때: ", error);
      });
  };

//인증샷 올리기
const addPostDB =
  (post, challengeId, totalNumber) =>
  (dispatch, getState, { history }) => {
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
        Key: `${user_info.nickname}` + date + ".jpg",
        Body: post.compressedFile,
      },
    });
    const promise = upload.promise();
    promise.then((data) => {
      consoleLogger(data);
      dispatch(imageActions.uploadImage(data.Location));

      let new_post = {
        postingImg: data.Location,
        postingContent: post.shotText,
        challengeId,
        totalNumber,
      };

      PostApis.addPost(new_post)
        .then((res) => {
          consoleLogger("인증샷 추가 요청 이후 응답", res);

          const challengeInfo = getState().challengeDetail.detail;

          const _post = {
            ...new_post,
            postingId: res.data,
            memberId: user_info.memberId,
            nickName: user_info.nickname,
            profileImg: user_info.profileImg,
            postingCount: 1,
            memberResponseDto: [user_info.memberId],
            postingApproval: true,
            postingModifyOk: true,
          };
          dispatch(addPost(_post));
          setTimeout(
            () => window.alert("오늘의 인증샷 게시물 작성 완료!"),
            300
          );
          history.push(`/challenge/${challengeInfo.challengeId}/post`);
          dispatch(imageActions.setPreview(null));
        })
        .catch((error) => {
          //   if (
          //     window.confirm(
          //       "인증샷 등록에 문제가 있습니다ㅜㅜ 메인화면으로 돌아가도 될까요?"
          //     )
          //   ) {
          //     history.push("/");
          //   } else {
          //     history.goBack();
          //   }
          //   consoleLogger("인증샷 추가 요청했을 때: ", error);
          // });
          if (
            error.response?.data?.message ===
            "이미 인증된 게시글은 삭제할 수 없습니다."
          ) {
            setTimeout(
              () =>
                window.alert(
                  "인증상태가 50% 이상이 된 게시물은 삭제가 안됩니다😁"
                ),
              300
            );
          } else if (
            error.response?.data?.message ===
            "동일한 챌린지에는 한번의 인증글만 작성할 수 있습니다."
          ) {
            setTimeout(
              () => window.alert("인증샷은 하루에 한번만 게시할 수 있어요!"),
              300
            );
          }
          consoleLogger("새로운 인증샷 추가할 때: ", error);
        });
    });
    // .catch((error) => {
    //   if (
    //     error.response?.data?.message ===
    //     "이미 인증된 게시글은 삭제할 수 없습니다."
    //   ) {
    //     window.alert("인증상태가 50% 이상이 된 게시물은 삭제가 안됩니다😁");
    //   } else if (
    //     error.response?.data?.message ===
    //     "동일한 챌린지에는 한번의 인증글만 작성할 수 있습니다."
    //   ) {
    //     window.alert("인증샷은 하루에 한번만 게시할 수 있어요!");
    //   }
    //   consoleLogger("새로운 인증샷 추가할 때: ", error);
    // });
  };

const editPostDB =
  (post_id, content, totalNumber) =>
  (dispatch, getState, { history }) => {
    const post_list = getState().post.list;
    const post_idx = post_list.findIndex((p) => p.postingId === post_id);
    const _post = post_list[post_idx];

    const post = {
      postingContent: content.shotText,
      postingImg: content.file,
      totalNumber,
    };

    if (content.file === _post.postingImg) {
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
            history.push("/home");
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
              history.push("/home");
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
    if (!window.confirm("정말 삭제 하시겠어요?")) {
      return;
    }
    PostApis.deletePost(post_id)
      .then((res) => {
        consoleLogger("삭제 요청 server에게 보낸 후 응답: ", res);
        dispatch(deletePost(post_id));
        setTimeout(() => window.alert("삭제 완료!"), 300);
      })
      .catch((error) => {
        // if (error) {
        //   history.push("/");
        // } else {
        //   history.goBack();
        // }
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
    PostApis.clickCheck(check_info).then((res) => {
      consoleLogger("응답확인 버튼 클릭 server로 요청 보낸 후 응답: ", res);

      const post_list = getState().post.list;
      const idx = post_list.findIndex((l) => l.postingId === post_id);
      const _post = post_list[idx];

      if (_post.memberResponseDto.includes(user_info.memberId)) {
        setTimeout(
          () => window.alert("이미 인증 확인을 완료하신 게시물 입니다 :)"),
          300
        );
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
