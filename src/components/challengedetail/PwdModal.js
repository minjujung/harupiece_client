import React, { useState } from "react";
import styled from "styled-components";

import Dialog from "@material-ui/core/Dialog";
import Button from "../../elements/Button";
import { Image } from "../../elements";
import close from "../../assets/images/icons/close.svg";

import { useDispatch, useSelector } from "react-redux";
import { actionCreator as challengeDetailActions } from "../../redux/modules/challengeDetail";
import { actionCreator as chatActions } from "../../redux/modules/chat";

// 소켓 통신
import Stomp from "stompjs";
import SockJS from "sockjs-client";
import { getCookie } from "../../shared/Cookie";

const PwdModal = (props) => {
  const { challengePassword, challengeId, challengeMember } = props;
  const chatInfo = useSelector((state) => state.chat.info);
  const challengeInfo = useSelector((state) => state.challengeDetail.detail);
  const userInfo = useSelector((state) => state.user.userInfo);

  // 소켓 통신 객체
  const sock = new SockJS("http://34.64.75.241/chatting");
  const ws = Stomp.over(sock);

  const token = getCookie("token");

  //웹소켓 연결, 구독
  const wsConnectSubscribe = () => {
    const data = {
      type: "ENTER",
      roomId: challengeId,
      nickname: userInfo.nickname,
      profileImg: userInfo.profileImg,
      alert: "[알림]",
    };
    try {
      ws.connect({ token }, () => {
        ws.send("/pub/enter", { token }, JSON.stringify(data));
        console.log(data);
        ws.subscribe(
          `/sub/api/chat/rooms/${challengeId}`,
          (data) => {
            console.log(data);
            const newMessage = JSON.parse(data.body);
            dispatch(chatActions.getMessages(newMessage));
          },
          { token }
        );
      });
    } catch (error) {
      console.log(error);
    }
  };

  const dispatch = useDispatch();
  const user_info = useSelector((state) => state.user.userInfo);

  const [open, setOpen] = useState(false);
  const [pwd, setPwd] = useState("");

  // modal창 닫기,
  const handleClose = () => {
    setOpen(false);
  };

  //비밀번호 입력값 받기
  const handleInput = (e) => {
    setPwd(e.target.value);
  };

  //비밀번호 작성후 챌린지 신청
  const takePartInPwd = () => {
    if (pwd === challengePassword) {
      dispatch(
        challengeDetailActions.takeInPartChallengeDB(
          challengeId,
          challengePassword
        )
      );
    } else {
      setTimeout(() => window.alert("비밀번호가 올바르지 않습니다!"), 300);
    }
  };

  //챌린지 신청히기, 비공개의 경우 비밀번호 모달창 띄우기
  const takePartIn = () => {
    if (user_info.memberId === null) {
      setTimeout(() => window.alert("로그인이 필요한 서비스 입니다!"), 300);
      return;
    }

    if (challengeMember.includes(user_info.memberId)) {
      setTimeout(() => window.alert("이미 참여중인 챌린지 입니다!"), 300);
      return;
    }

    if (challengeMember.length === 10) {
      setTimeout(
        () => window.alert("10명까지만 참여할 수 있는 챌린지 입니다!"),
        300
      );
    }

    if (challengePassword) {
      setOpen(true);
    } else {
      wsConnectSubscribe();
      dispatch(challengeDetailActions.takeInPartChallengeDB(challengeId));
    }
  };

  let intViewportWidth = window.innerWidth;

  return (
    <>
      <Button
        width="100%"
        height="5.93vh"
        bg="mainGreen"
        color="white"
        // padding="21px 64px"
        border="lightGray"
        margin="0 0 20px 0"
        _onClick={takePartIn}
      >
        챌린지 신청하기
      </Button>
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
                  borderRadius: "32px",
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
          <p>
            해당 챌린지는 비공개 챌린지입니다.
            <br />
            비밀번호를 입력하여 챌린지에 참가해주세요.
          </p>
        </PwdIntro>
        <PwdInput>
          <Input
            id="challengePwd"
            value={pwd}
            type="password"
            onChange={handleInput}
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
  ${({ theme }) => theme.device.mobileLg} {
    p {
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
      font-size: 18px;
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
    margin-top: 10.28vw;
    button {
      width: 33.33vw;
      height: 12.22vw;
    }
  }
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
  ${({ theme }) => theme.device.mobileLg} {
    width: 44.44vw;
    height: 12.22vw;
    margin-right: 4.44vw;
    padding-left: 4.44vw;
  }
`;
