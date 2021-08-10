import { createAction, handleActions } from "redux-actions";
import produce from "immer";

import { consoleLogger } from "../configureStore";
import { ChatApis } from "../../shared/api";

//DB에 저장되어 있던 대화목록 가져오기
const SET_MESSAGES = "SET_MESSAGES";

//실시간으로 상대방이 보내오는 메세지 가져오기
const GET_MESSAGES = "GET_MESSAGES";

//실시간으로 메세지 보내기
const WRITE_MESSAGE = "WRITE_MESSAGE";

const LOADING = "LOADING";

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
    // // 메시지 로딩
    loading: false,
  },
};

// DB에 존재하는 채팅방 메시지들 가져오기
const getMessagesDB =
  (challengeId) =>
  (dispatch, getState, { history }) => {
    ChatApis.getMessages(challengeId)
      .then((res) => {
        consoleLogger("DB에 저장되어 있는 채팅 목록 가져오는 요청의 응답", res);
      })
      .catch((error) => console.log(error));
  };

export default handleActions(
  {
    [SET_MESSAGES]: (state, action) =>
      produce(state, (draft) => {
        draft.info.messages = action.payload.messageList;
      }),

    [GET_MESSAGES]: (state, action) =>
      produce(state, (draft) => {
        draft.info.messages.push(action.payload.setMessages);
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
  setMessages,
  getMessages,
  writeMessage,
  loading,
  getMessagesDB,
};

export { actionCreator };
