import { createAction, handleActions } from "redux-actions";
import produce from "immer";

import { consoleLogger } from "../configureStore";
import { ChatApis } from "../../shared/api";

//paging 포함한 chatting room 정보
const SET_CHATINFO = "SET_CHATINFO";

const RESET_CHATTING = "RESET_CHATTING";

//DB에 저장되어 있던 대화목록 가져오기
const SET_MESSAGES = "SET_MESSAGES";

//실시간으로 상대방이 보내오는 메세지 가져오기
const GET_MESSAGES = "GET_MESSAGES";

//실시간으로 메세지 보내기
const WRITE_MESSAGE = "WRITE_MESSAGE";

const LOADING = "LOADING";

const setChatInfo = createAction(SET_CHATINFO, (messageList, paging) => ({
  messageList,
  paging,
}));

const resetChatting = createAction(RESET_CHATTING, (messageList, paging) => ({
  messageList,
  paging,
}));

const setMessages = createAction(SET_MESSAGES, (messageList) => ({
  messageList,
}));
const getMessages = createAction(GET_MESSAGES, (message) => ({
  message,
}));
const writeMessage = createAction(WRITE_MESSAGE, (messageText) => ({
  messageText,
}));
const loading = createAction(LOADING, (is_loading) => ({ is_loading }));

const initialState = {
  info: {
    challengeId: null,
    roomId: null,
    // 현재 접속 채팅 메시지
    messages: [],
    messageText: "",
    // // 메시지 현재 페이지
    // messageCurPage: null,
    // // 메시지 총 페이지
    // messageTotalPage: null,
    // 메시지 로딩
  },
  paging: { page: 1, next: null, size: 15 },
  is_loading: false,
};

// DB에 존재하는 채팅방 메시지들 가져오기
const getMessagesDB =
  (challengeId) =>
  (dispatch, getState, { history }) => {
    const _paging = getState().chat.paging;
    if (_paging.page === false && _paging.next === false) {
      return;
    }

    ChatApis.getMessages(challengeId, _paging.page)
      .then((res) => {
        consoleLogger("DB에 저장되어 있는 채팅 목록 가져오는 요청의 응답", res);

        let new_paging = {
          page:
            res.data.chatMessages?.length < _paging.size
              ? false
              : _paging.page + 1,
          next: res.data.hasNext,
          size: _paging.size,
        };

        dispatch(setChatInfo(res.data.chatMessages, new_paging));
      })
      .catch((error) => consoleLogger(error));
  };

export default handleActions(
  {
    [RESET_CHATTING]: (state, action) =>
      produce(state, (draft) => {
        draft.info.messages = action.payload.messageList;
        draft.paging = action.payload.paging;
        draft.is_loading = false;
      }),

    [SET_CHATINFO]: (state, action) =>
      produce(state, (draft) => {
        draft.info.messages.unshift(...action.payload.messageList);
        draft.paging = action.payload.paging;
        draft.is_loading = false;
      }),

    [SET_MESSAGES]: (state, action) =>
      produce(state, (draft) => {
        draft.info.messages = action.payload.messageList;
      }),

    [GET_MESSAGES]: (state, action) =>
      produce(state, (draft) => {
        draft.info.messages.push(action.payload.message);
        draft.is_loading = true;
      }),

    [WRITE_MESSAGE]: (state, action) =>
      produce(state, (draft) => {
        draft.info.messageText = action.payload.messageText;
      }),

    [LOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.is_loading = action.payload.is_loading;
      }),
  },
  initialState
);

const actionCreator = {
  resetChatting,
  setMessages,
  getMessages,
  setChatInfo,
  writeMessage,
  loading,
  getMessagesDB,
};

export { actionCreator };
