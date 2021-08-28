import React, { useEffect, useCallback } from "react";
import styled from "styled-components";

import { Image } from "../../elements";
import close from "../../assets/images/icons/whiteClose.svg";
import MessageWrite from "./MessageWrite";
import MessageList from "./MessageList";

import { history } from "../../redux/configureStore";
import { useDispatch, useSelector } from "react-redux";
import { actionCreator as chatActions } from "../../redux/modules/chat";
import { getCookie } from "../../shared/Cookie";

// 소켓 통신
import Stomp from "stompjs";
import SockJS from "sockjs-client";

const Chat = ({ id, setOpen }) => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.userInfo);

  // 소켓 통신 객체
  const sock = new SockJS("https://api.harupiece.com/chatting");
  const ws = Stomp.over(sock);
  ws.debug = null;

  const token = getCookie("token");

  //웹소켓 연결, 구독
  const wsConnectSubscribe = useCallback(() => {
    const data = {
      type: "ENTER",
      roomId: id,
      nickname: userInfo.nickname,
      profileImg: userInfo.profileImg,
      message: "",
      statusFirst: true,
      alert: "[알림]",
    };
    try {
      ws.connect({ token }, () => {
        ws.send("/pub/enter", { token }, JSON.stringify(data));
        ws.subscribe(
          `/sub/api/chat/rooms/${id}`,
          (data) => {
            const newMessage = JSON.parse(data.body);
            dispatch(chatActions.getMessages(newMessage));
          },
          { token }
        );
      });
    } catch (error) {
      console.log(error);
    }
  }, [dispatch, id, token, userInfo.nickname, userInfo.profileImg, ws]);

  // 연결해제, 구독해제;
  const wsDisConnectUnsubscribe = useCallback(() => {
    try {
      ws.send("/pub/quit", { token }, {});
      ws.disconnect(
        () => {
          ws.unsubscribe("sub-0");
        }
        // { token }
      );
    } catch (error) {
      console.log(error);
    }
  }, [token, ws]);

  //  렌더링 될 때마다 연결,구독 다른 방으로 옮길 때 연결, 구독 해제
  useEffect(() => {
    wsConnectSubscribe();
    dispatch(chatActions.getMessagesDB(id));
    return () => {
      wsDisConnectUnsubscribe();
    };
  }, [dispatch, id, wsConnectSubscribe, wsDisConnectUnsubscribe]);

  // 웹소켓이 연결될 때 까지 실행하는 함수
  const waitForConnection = (ws, callback) => {
    setTimeout(
      function () {
        // 연결되었을 때 콜백함수 실행
        if (ws.ws.readyState === 1) {
          callback();
          // 연결이 안 되었으면 재호출
        } else {
          waitForConnection(ws, callback);
        }
      },
      0.1 // 밀리초 간격으로 실행
    );
  };

  // 메시지 보내기
  const sendMessage = (msg) => {
    try {
      // token이 없으면 로그인 페이지로 이동
      if (!token) {
        alert("토큰이 없습니다. 다시 로그인 해주세요.");
        history.replace("/login");
      }

      if (msg === "") {
        return;
      }

      // send할 데이터

      const data = {
        type: "TALK",
        roomId: id,
        nickname: userInfo.nickname,
        profileImg: userInfo.profileImg,
        // message: chatInfo.messageText,
        message: msg,
        alert: "",
      };

      //   빈문자열이면 리턴
      //   로딩 중
      dispatch(chatActions.loading(false));
      waitForConnection(ws, function () {
        ws.send("/pub/talk", { token }, JSON.stringify(data));
        dispatch(chatActions.writeMessage(""));
      });
    } catch (error) {
      console.log(`error: ${error.response.status}`);
    }
  };

  const closeChat = () => {
    setOpen(false);
    wsDisConnectUnsubscribe();
  };

  return (
    <Container>
      <ChatBox>
        <Header>
          <h1>채팅</h1>
          <Image
            chatClose
            width="20px"
            height="20px"
            borderRadius="0"
            src={close}
            alt="closeBtn"
            onClick={closeChat}
          />
        </Header>
        <Banner>
          바르고 고운말 사용을 지향합니다 👼 <br />
          비방글을 지속적으로 작성할 시 <br />
          제재 대상이 될 수 있습니다. 🤬
        </Banner>
        <MessageList challengeId={id} />
        {/* <div ref={scrollRef}></div> */}
        <MessageWrite sendMessage={sendMessage} />
      </ChatBox>
    </Container>
  );
};

export default Chat;

const Container = styled.div`
  height: 100%;
  position: relative;
  z-index: 100;
  ${({ theme }) => theme.device.mobileLg} {
    width: 100%;
    height: 100%;
    button {
      position: fixed;
      right: 32px;
      bottom: 14.38vh;
      z-index: 10;
    }
  }
`;

const ChatBox = styled.div`
  height: 59.26%;
  overflow: hidden;
  position: fixed;
  z-index: 100;
  right: 16.67%;
  bottom: 15%;
  border-radius: 12px;
  border: 3px solid ${({ theme }) => theme.colors.mainGreen};
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: 6px 5px 14px -8px rgba(0, 0, 0, 0.4);
  ${({ theme }) => theme.device.mobileLg} {
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }
`;

const Header = styled.div`
  /* width: 16.15vw; */
  min-width: 331px;
  height: 4.44vh;
  object-fit: cover;
  text-align: center;
  color: ${({ theme }) => theme.colors.white};
  h1 {
    min-width: 331px;
    width: 16.15vw;
    height: 4.44vh;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: ${({ theme }) => theme.fontSizes.md};
    background-color: ${({ theme }) => theme.colors.mainGreen};
  }
  ${({ theme }) => theme.device.mobileLg} {
    width: 100%;
    height: 5vh;
    h1 {
      width: 100%;
      height: 5vh;
      /* height: 8.89vw; */
    }
  }
`;

const Banner = styled.p`
  width: 98%;
  margin: 1% auto 0 auto;
  border-radius: 1px solid gray;
  text-align: center;
  line-height: 120%;
  padding: 3%;
  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  user-select: none;
  box-shadow: rgb(0 219 154 / 20%) 0px 1px 20px;
`;
