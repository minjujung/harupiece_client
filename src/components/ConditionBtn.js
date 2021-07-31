import React, { useState } from "react";
import PostWrite from "./PostWrite";

import { useDispatch, useSelector } from "react-redux";
import { actionCreator as challengeDetailActions } from "../redux/modules/challengeDetail";
import PwdModal from "./PwdModal";

const ConditionBtn = (props) => {
  const dispatch = useDispatch();
  const user_info = useSelector((state) => state.user.userInfo);

  const {
    challengeProgress,
    challengeId,
    challengeMember,
    challengePassword,
    challengeTitle,
  } = props;

  //챌린지 포기하기
  const giveupChallenge = () => {
    if (
      window.confirm(
        "챌린지를 포기하시면 중간에 다시 신청할 수 없어요ㅜㅜ 그래도 챌린지 진행을 중단하시겠어요?"
      )
    ) {
      dispatch(challengeDetailActions.giveupChallengeDB(challengeId));
    }
  };

  if (challengeProgress === 1) {
    if (challengeMember.includes(user_info.memberId)) {
      return <button onClick={giveupChallenge}>챌린지 포기하기</button>;
    } else {
      return <PwdModal challengeMember={challengeMember} {...props} />;
    }
  } else if (
    challengeProgress === 2 &&
    challengeMember.includes(user_info.memberId)
  ) {
    return (
      <>
        <PostWrite challengeId={challengeId} />
        <button onClick={giveupChallenge}>챌린지 포기하기</button>
      </>
    );
  } else {
    return <button>진행이 완료된 챌린지 입니다!</button>;
  }
};

export default ConditionBtn;
