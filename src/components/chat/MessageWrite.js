import React, { useRef, useState } from "react";
import styled from "styled-components";

import send from "../../images/icons/send.svg";
import { Image } from "../../elements";

import { useDispatch, useSelector } from "react-redux";
import { actionCreator as chatActions } from "../../redux/modules/chat";

const MessageWrite = ({ sendMessage }) => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.chat.info.is_loading);

  const [msg, setMsg] = useState("");

  const handleMessage = (e) => {
    setMsg(e.target.value);
    dispatch(chatActions.writeMessage(e.target.value));
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
            sendMessage();
          }
        }}
      />
      <Image
        width="24px"
        height="24px"
        src={send}
        alt="send"
        onClick={sendMessage}
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
