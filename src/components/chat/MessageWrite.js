import React, { useRef, useState } from "react";
import styled from "styled-components";

import send from "../../assets/images/icons/send.svg";
import { Image } from "../../elements";

import { useDispatch } from "react-redux";
import { actionCreator as chatActions } from "../../redux/modules/chat";

const MessageWrite = ({ sendMessage }) => {
  const dispatch = useDispatch();

  const [msg, setMsg] = useState("");

  const handleMessage = (e) => {
    setMsg(e.target.value);
  };

  const sendMsg = (message) => {
    sendMessage(message);
  };

  // 오토 포커스 대상
  const autoFocus = useRef(null);
  React.useEffect(() => {
    autoFocus.current?.focus();
  }, []);

  return (
    <InputField>
      <input
        type="text"
        value={msg}
        ref={autoFocus}
        placeholder="메세지를 입력해주세요."
        onChange={handleMessage}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            sendMsg(msg);
            setMsg("");
          }
        }}
      />
      <Image
        width="24px"
        height="24px"
        src={send}
        alt="send"
        onClick={() => {
          sendMsg(msg);
          setMsg("");
        }}
      />
    </InputField>
  );
};

export default MessageWrite;

const InputField = styled.div`
  width: 100%;
  height: 5.93vh;
  padding: 1.85vh 1.04vw;
  display: flex;
  justify-content: space-between;
  border-top: 2px solid ${({ theme }) => theme.colors.lightGray};
  background-color: white;
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
  ${({ theme }) => theme.device.mobileLg} {
    height: 10%;
    align-items: center;
    input {
      width: 90%;
      height: 100%;
      padding-left: 5.56vw;
    }
    img {
      width: 10%;
      height: 100%;
      margin-right: 5.56vw;
    }
  }
`;
