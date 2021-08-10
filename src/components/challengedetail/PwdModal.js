import React, { useRef, useState } from "react";
import styled from "styled-components";

import Dialog from "@material-ui/core/Dialog";
import Button from "../../elements/Button";
import { Image } from "../../elements";
import close from "../../assets/images/icons/close.svg";

import { useDispatch, useSelector } from "react-redux";
import { actionCreator as challengeDetailActions } from "../../redux/modules/challengeDetail";

const PwdModal = (props) => {
  const { challengeTitle, challengePassword, challengeId, challengeMember } =
    props;

  const dispatch = useDispatch();
  const user_info = useSelector((state) => state.user.userInfo);

  const [open, setOpen] = useState(false);
  const pwdInput = useRef();

  //   const handleClickOpen = () => {
  //     setOpen(true);
  //   };

  // modal창 닫기,
  const handleClose = () => {
    setOpen(false);
  };

  //비밀번호 작성후 챌린지 신청
  const takePartInPwd = () => {
    if (pwdInput.current?.value === challengePassword) {
      dispatch(
        challengeDetailActions.takeInPartChallengeDB(
          challengeId,
          challengePassword
        )
      );
    } else {
      window.alert("비밀번호가 올바르지 않습니다!");
    }
  };

  //챌린지 신청히기, 비공개의 경우 비밀번호 모달창 띄우기
  const takePartIn = () => {
    if (user_info.memberId === null) {
      window.alert("로그인이 필요한 서비스 입니다!");
      return;
    }

    if (challengeMember.includes(user_info.memberId)) {
      window.alert("이미 참여중인 챌린지 입니다!");
      return;
    }

    if (challengePassword) {
      setOpen(true);
    } else {
      dispatch(challengeDetailActions.takeInPartChallengeDB(challengeId));
    }
  };

  return (
    <>
      <Button
        width="16.15vw"
        bg="mainGreen"
        color="white"
        padding="21px 64px"
        border="lightGray"
        margin="0 0 20px 0"
        _onClick={takePartIn}
      >
        챌린지 신청하기
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
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
          <p>
            해당 챌린지는 비공개 챌린지입니다.
            <br />
            비밀번호를 입력하여 챌린지에 참가해주세요.
          </p>
        </PwdIntro>
        <PwdInput>
          <Input
            id="challengePwd"
            ref={pwdInput}
            type="password"
            placeholder="1234567"
          />
          <Button
            width="7.08vw"
            height="3.7vh"
            fontsize="sm"
            _onClick={takePartInPwd}
          >
            비밀번호 입력
          </Button>
        </PwdInput>
      </Dialog>
    </>
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
