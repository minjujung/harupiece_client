import React from "react";
import styled from "styled-components";

import Dialog from "@material-ui/core/Dialog";
import Button from "../../elements/Button";
import { Image } from "../../elements";
import close from "../../assets/images/icons/close.svg";

const PwdModal = ({ pwd, setPwd, savePwd, open, setOpen }) => {
  // modal창 닫기,
  const handleClose = () => {
    setOpen(false);
  };

  const handleInput = (e) => {
    setPwd(e.target.value);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      disableScrollLock={true}
      aria-labelledby="form-dialog-title"
      PaperProps={{
        style: {
          width: "23.33vw",
          height: "18.15vh",
          padding: "1.46vw",
          borderRadius: "16px",
          overflowY: "hidden",
          boxShadow: "rgba(0,219,154,0.2) 0px 8px 24px",
        },
      }}
    >
      <PwdIntro>
        <DialogInfo>
          <label htmlFor="challengePwd">
            챌린지의 비밀번호를 입력해주세요.
          </label>
          <Image
            src={close}
            alt="closeBtn"
            onClick={handleClose}
            width="28px"
            height="28px"
            borderRadius="0"
          />
        </DialogInfo>
        <p>비밀번호의 최소 길이는 4자이며, 최대 길이는 13자입니다.</p>
      </PwdIntro>
      <PwdInput>
        <Input
          id="challengePwd"
          value={pwd}
          type="password"
          placeholder="1234567"
          onChange={handleInput}
        />
        <Button width="7.08vw" height="3.7vh" fontsize="sm" _onClick={savePwd}>
          비밀번호 입력
        </Button>
      </PwdInput>
    </Dialog>
  );
};

export default PwdModal;

const PwdIntro = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  p {
    color: ${({ theme }) => theme.colors.gray};
    font-size: 12px;
    height: 3.15vh;
    line-height: normal;
  }
`;

const DialogInfo = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  label {
    font-weight: bold;
    font-size: ${({ theme }) => theme.fontSizes.md};
    height: 3.8vh;
  }
`;

const PwdInput = styled.div`
  width: 100%;
  display: flex;
  margin-top: 2.31vh;
`;

const Input = styled.input`
  width: 12.5vw;
  height: 3.7vh;
  padding: 1.02vh 0.83vw;
  border: none;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.lightGray};
  caret-color: ${({ theme }) => theme.colors.mainGreen};
  ::placeholder {
    font-size: ${({ theme }) => theme.fontSizes.ms};
  }
  :focus {
    border: 2px solid ${({ theme }) => theme.colors.mainGreen};
  }
`;
