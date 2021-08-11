import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { Button, Image } from "../../elements";
import chat from "../../assets/images/icons/chat.svg";
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

const Chat = (props) => {
  // 소켓 통신 객체
  const sock = new SockJS("http://54.180.141.39/chatting");
  const ws = Stomp.over(sock);

  const dispatch = useDispatch();
  const chatInfo = useSelector((state) => state.chat.info);
  const challengeInfo = useSelector((state) => state.challengeDetail.detail);
  const userInfo = useSelector((state) => state.user.userInfo);

  const [open, setOpen] = useState(false);

  const token = getCookie("token");
  //웹소켓 연결, 구독
  const wsConnectSubscribe = () => {
    console.log(challengeInfo.challengeId);
    console.log(token);
    try {
      ws.connect({ token }, () => {
        ws.subscribe(
          `/sub/api/chatroom/${challengeInfo.challengeId}`,
          (data) => {
            const newMessage = JSON.parse(data.body);
            console.log(newMessage);
            dispatch(chatActions.getMessages({ ...newMessage }));
          },
          { token }
        );
      });
    } catch (error) {
      console.log(error);
    }
  };

  // 연결해제, 구독해제;
  const wsDisConnectUnsubscribe = () => {
    try {
      ws.disconnect(
        () => {
          ws.unsubscribe("sub-0");
        }
        // { token }
      );
    } catch (error) {
      console.log(error);
    }
  };

  // 렌더링 될 때마다 연결,구독 다른 방으로 옮길 때 연결, 구독 해제
  useEffect(() => {
    wsConnectSubscribe();
    dispatch(chatActions.getMessagesDB(challengeInfo.challengeId));
    return () => {
      wsDisConnectUnsubscribe();
    };
  }, [chatInfo.roomId]);

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
      1 // 밀리초 간격으로 실행
    );
  };

  // 메시지 보내기
  const sendMessage = () => {
    try {
      // token이 없으면 로그인 페이지로 이동
      if (!token) {
        alert("토큰이 없습니다. 다시 로그인 해주세요.");
        history.replace("/login");
      }
      // send할 데이터

      const data = {
        type: "TALK",
        roomId: challengeInfo.challengeId,
        message: chatInfo.messageText,
      };
      // 빈문자열이면 리턴
      if (chatInfo.messageText === "") {
        return;
      }
      // 로딩 중
      // dispatch(chatActions.loading());
      waitForConnection(ws, function () {
        ws.send("/pub/api/chat/message", data);
        console.log(ws.ws.readyState);
        console.log(data);
        dispatch(chatActions.writeMessage(""));
      });
    } catch (error) {
      console.log(error);
      console.log(ws.ws.readyState);
    }
  };

  const openChat = () => {
    if (!challengeInfo.challengeMember.includes(userInfo.memberId)) {
      window.alert("챌린지에 참여하는 사람만 채팅방 입장이 가능합니다!");
      return;
    }
    setOpen(true);
  };

  const closeChat = () => {
    setOpen(false);
  };

  return (
    <Container>
      <Button
        chat
        width="80px"
        height="80px"
        bg="mainGreen"
        borderRadius="50%"
        _onClick={openChat}
      >
        <Image width="48px" height="48px" src={chat} alt="chatBtn" />
      </Button>
      {open ? (
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
          <MessageList />
          <MessageWrite sendMessage={sendMessage} />
        </ChatBox>
      ) : null}
    </Container>
  );
};

export default Chat;

const Container = styled.div`
  position: relative;
  ${({ theme }) => theme.device.mobileLg} {
    button {
      position: fixed;
      right: 32px;
      bottom: 14.38vh;
      z-index: 10;
    }
  }
`;

const ChatBox = styled.div`
  width: 16.15vw;
  height: 59.26vh;
  overflow: hidden;
  position: absolute;
  z-index: 100;
  top: -28.04vh;
  border-radius: 12px;
  border: 3px solid ${({ theme }) => theme.colors.mainGreen};
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: 6px 5px 14px -8px rgba(0, 0, 0, 0.4);
`;

const Header = styled.div`
  width: 16.15vw;
  height: 4.44vh;
  object-fit: cover;
  text-align: center;
  /* background-color: ${({ theme }) => theme.colors.mainGreen}; */
  color: ${({ theme }) => theme.colors.white};
  h1 {
    width: 16.15vw;
    height: 4.44vh;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: ${({ theme }) => theme.fontSizes.md};
    background-color: ${({ theme }) => theme.colors.mainGreen};
  }
`;
