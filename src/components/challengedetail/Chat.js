import React, { useState } from "react";
import styled from "styled-components";

import { Button, Image } from "../../elements";
import chat from "../../assets/images/icons/chat.svg";
import close from "../../assets/images/icons/whiteClose.svg";
import send from "../../assets/images/icons/send.svg";

const Chat = (props) => {
  const [open, setOpen] = useState(false);

  const openChat = () => {
    setOpen(true);
  };

  const closeChat = () => {
    setOpen(false);
  };

  return (
    <>
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
          <InputField>
            <input type="text" placeholder="메세지를 입력해주세요." />
            <Image width="24px" height="24px" src={send} alt="send" />
          </InputField>
        </ChatBox>
      ) : null}
    </>
  );
};

export default Chat;

const ChatBox = styled.div`
  width: 16.15vw;
  height: 59.26vh;
  overflow: hidden;
  position: absolute;
  z-index: 100;
  top: 37.04vh;
  right: 16.67vw;
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

const InputField = styled.div`
  width: 100%;
  height: 5.93vh;
  padding: 1.85vh 1.04vw;
  display: flex;
  justify-content: space-between;
  border-top: 2px solid ${({ theme }) => theme.colors.lightGray};
  position: absolute;
  bottom: 0;
  input {
    width: 11.77vw;
    height: 2.22vh;
    ::placeholder {
      font-size: ${({ theme }) => theme.fontSizes.sm};
      color: ${({ theme }) => theme.colors.gray};
    }
  }
`;
