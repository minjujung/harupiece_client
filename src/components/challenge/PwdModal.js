import React from "react";
import styled from "styled-components";

import Dialog from "@material-ui/core/Dialog";
import Button from "../../elements/Button";
import { Image } from "../../elements";
import close from "../../assets/images/icons/close.svg";

const PwdModal = ({
  pwd,
  setPwd,
  savePwd,
  open,
  setOpen,
  pwdNumCheck,
  setPwdNumCheck,
}) => {
  // modal창 닫기,
  const handleClose = () => {
    setOpen(false);
    setPwdNumCheck("");
  };

  const handleInput = (e) => {
    setPwd(e.target.value);
  };

  let intViewportWidth = window.innerWidth;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      disableScrollLock={true}
      aria-labelledby="form-dialog-title"
      PaperProps={
        intViewportWidth > 720
          ? {
              style: {
                width: "23.33vw",
                height: "18.15vh",
                padding: "1.46vw",
                borderRadius: "16px",
                overflowY: "hidden",
                boxShadow: "rgba(0,219,154,0.2) 0px 8px 24px",
              },
            }
          : {
              style: {
                width: "91.11vw",
                height: "45.83vw",
                padding: "4.44vw",
                borderRadius: "16px",
              },
            }
      }
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
        <strong>{pwdNumCheck}</strong>
      </PwdIntro>
      <PwdInput alert={pwdNumCheck !== "" ? true : false}>
        <Input
          id="challengePwd"
          value={pwd}
          type="password"
          placeholder="1234567"
          onChange={handleInput}
        />
        <Button width="7.08vw" height="40px" fontsize="sm" _onClick={savePwd}>
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
    line-height: normal;
  }
  strong {
    color: ${({ theme }) => theme.colors.mainOrange};
    font-size: 12px;
  }
  ${({ theme }) => theme.device.mobileLg} {
    p {
      font-size: 11px;
      margin-top: 4.44vw;
    }
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
  ${({ theme }) => theme.device.mobileLg} {
    label {
      font-size: 17px;
      height: inherit;
    }
    img {
      width: 5vw;
      height: 5vw;
    }
  }
`;

const PwdInput = styled.div`
  width: 100%;
  display: flex;
  margin-top: 2.31vh;
  ${({ theme }) => theme.device.mobileLg} {
    margin-top: ${(props) => (props.alert ? "7.5vw" : "10.28vw")};
    button {
      width: 33.33vw;
      height: 12.22vw;
      font-size: 15px;
    }
  }
`;

const Input = styled.input`
  width: 12.5vw;
  height: 40px;
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
  ${({ theme }) => theme.device.mobileLg} {
    width: 44.44vw;
    height: 12.22vw;
    margin-right: 4.44vw;
    padding-left: 4.44vw;
  }
`;
