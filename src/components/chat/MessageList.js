import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { Image } from "../../elements";

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
      {msgList?.map((msg) => (
        <MsgFrame>
          <Sender>
            {msg.profileImg ? (
              <Image
                width="20px"
                height="20px"
                src={msg.profileImg}
                alt="msgSender"
              />
            ) : null}
            <p style={{ fontWeight: "bold" }}>{msg.sender}</p>
          </Sender>
          <Message>{msg.message}</Message>
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
`;

const MsgFrame = styled.div`
  margin-bottom: 1.76vh;
`;

const Sender = styled.div``;

const Message = styled.p``;
