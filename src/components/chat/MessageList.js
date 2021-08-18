import React, { useEffect, useRef } from "react";
import styled from "styled-components";

import green from "../../assets/images/level/green.svg";
import { Image } from "../../elements";

import { useSelector } from "react-redux";

const MessageList = (props) => {
  const msgList = useSelector((state) => state.chat.info.messages);
  const user_info = useSelector((state) => state.user.userInfo);

  // 스크롤 대상(제일 마지막 메세지)
  const scrollTo = useRef();

  // 스크롤 자동으로 맨마지막 채팅까지 내려가게 하기
  const scrollToBottom = () => {
    //모바일에서는 실행 X
    if (window.innerWidth <= 375) {
      return;
    }
    scrollTo.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, []);

  return (
    <Chat>
      {msgList?.map((msg) => (
        <MsgFrame key={msg.chatMessageId}>
          {msg.sender === "[알림]" ? (
            <EnterMsg>{msg.message}</EnterMsg>
          ) : (
            <>
              {" "}
              <Sender me={user_info.nickname === msg.sender ? true : false}>
                <Image
                  width="1.25vw"
                  height="auto"
                  src={msg.profileImg ? msg.profileImg : green}
                  alt="msgSender"
                />
                <p style={{ fontWeight: "bold" }}>{msg.sender}</p>
              </Sender>
              <Message me={user_info.nickname === msg.sender ? true : false}>
                {msg.message}
              </Message>
            </>
          )}
        </MsgFrame>
      ))}
      <div ref={scrollTo}></div>
    </Chat>
  );
};
export default MessageList;

const Chat = styled.div`
  height: 48vh;
  padding: 1.76vh 0.83vw 0 0.83vw;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    margin-left: 30px;
    width: 5px;
    height: 8px;
  }
  ::-webkit-scrollbar-track {
    background-color: transparent;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

const MsgFrame = styled.div`
  margin-bottom: 1.76vh;
`;

const EnterMsg = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.gray};
`;

const Sender = styled.div`
  ${(props) => (props.me ? "display: none" : "display: flex")};
  p {
    margin-left: 0.42vw;
  }
`;

const Message = styled.p`
  /* width: 10.42vw; */
  padding: 0.42vw;
  border-radius: 8px;
  background-color: ${(props) =>
    props.me ? props.theme.colors.mainGreen : props.theme.colors.lightGray};
  color: ${(props) => (props.me ? "white" : "black")};
  margin-left: ${(props) => (props.me ? "4.06vw" : "1.67vw")};
  word-break: break-all;
`;
