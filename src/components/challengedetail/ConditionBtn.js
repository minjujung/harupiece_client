import React from "react";
import PostWrite from "./PostWrite";

import { useDispatch, useSelector } from "react-redux";
import { actionCreator as challengeDetailActions } from "../../redux/modules/challengeDetail";
import PwdModal from "./PwdModal";
import Button from "../../elements/Button";

const ConditionBtn = (props) => {
  const dispatch = useDispatch();
  const user_info = useSelector((state) => state.user.userInfo);

  const {
    challengeProgress,
    challengeId,
    challengeMember,
    memberId,
    challengeHollyday,
  } = props;

  //챌린지 포기하기
  const giveupChallenge = () => {
    if (
      window.confirm(
        "챌린지 시작 후에는 다시 신청할 수 없어요ㅜㅜ 그래도 챌린지 신청을 취소하시겠어요?"
      )
    ) {
      dispatch(challengeDetailActions.giveupChallengeDB(challengeId));
    }
  };

  if (!user_info) {
    return;
  }

  if (challengeProgress === 1) {
    //챌린지 진행 전에 로그인한 유저가 이미 신청되어 있는 경우
    if (challengeMember.includes(user_info.memberId)) {
      //챌린지 진행전에 로그인한 유저가 챌린지 생성 유저면 챌린지 시작전에 보여줄거는
      // ChallengeDetail.js에서 다 보여주므로 여기서는 null
      if (user_info.memberId === memberId) {
        return null;
      } else {
        return (
          <Button
            width="100%"
            height="5.93vh"
            bg="white"
            color="mainGreen"
            border="lightGray"
            margin="0 0 20px 0"
            _onClick={giveupChallenge}
          >
            챌린지 신청 취소하기
          </Button>
        );
      }
    } else {
      //챌린지 진행전인데 신청 안된 상태면 공개/비공개 나눠서 신청 받기
      return (
        <PwdModal
          challengeMember={challengeMember}
          challengeHollyday={challengeHollyday}
          {...props}
        />
      );
    }
  }
  // 챌린지 진행중에 로그인한 사용자가 신청자 이면 인증샷 올리기 버튼
  else if (
    challengeProgress === 2 &&
    challengeMember.includes(user_info.memberId)
  ) {
    return (
      <>
        <PostWrite challengeId={challengeId} />
      </>
    );
  } else if (
    challengeProgress === 2 &&
    !challengeMember.includes(user_info.memberId)
  ) {
    return (
      <Button
        borderRadius="16px"
        width="100%"
        height="5.93vh"
        border="white"
        bg="white"
        margin="4.07vh 0 0 0"
        color="mainGreen"
        fontsize="md"
      >
        챌린지 시작이후에는
        <br /> 신청이 어려워요😂
      </Button>
    );
  } else if (challengeProgress === 3) {
    return (
      <Button
        borderRadius="16px"
        width="100%"
        height="5.93vh"
        border="white"
        bg="white"
        margin="4.07vh 0 0 0"
        color="mainGreen"
      >
        진행이 완료된 챌린지 입니다!
      </Button>
    );
  } else {
    return null;
  }
};

export default ConditionBtn;
