import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import instance from "../../shared/api";
import { consoleLogger } from "../configureStore";

const SET_POST = "SET_POST";
const LOADING = "LOADING";

const setPost = createAction(SET_POST, (post_list, paging) => ({
  post_list,
  paging,
}));
const loading = createAction(LOADING, (is_loading) => ({ is_loading }));

const initialState = {
  list: [],
  paging: { start: null, next: null, size: 6, page: 1 },
  is_loading: false,
};

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
      .get(`/api/member/posting/${page}/${challengeId}`)
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
        if (
          window.confirm(
            "인증샷 목록을 불러오는데 실패했어요ㅜㅜ 메인화면으로 돌아가도 될까요?"
          )
        ) {
          history.push("/");
        }
        // } else {
        //   history.goback();
        // }
        consoleLogger(error);
      });
  };

export default handleActions(
  {
    [SET_POST]: (state, action) => (
      state,
      (draft) => {
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
      }
    ),
  },
  initialState
);

const actionCreator = {
  getPostDB,
};

export { actionCreator };
