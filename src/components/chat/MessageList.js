import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const MessageList = (props) => {
  const msgList = useSelector((state) => state.chat.info.messages);

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
      {/* {msgList.map((msg) => (
        <>
          <Sender>
            <Image src={msg.profileImg} alt="msgSender" />
            <p>{msg.nickname}</p>
          </Sender>
          <Message>{msg.text}</Message>
        </>
      ))}
      <div ref={scrollTo}></div> */}
      {msgList[0].message}
    </Chat>
  );
};
export default MessageList;

const Chat = styled.div``;

// const Sender = styled.div``;

// const Message = styled.p``;
