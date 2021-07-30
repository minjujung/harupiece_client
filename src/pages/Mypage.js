import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as myInfo } from "../redux/modules/mypage";
import ChallengesInProgress from "../components/ChallengesInProgress";
import UpcomingChallenge from "../components/UpcomingChallenge";
import CompletedChallenge from "../components/CompletedChallenge";

function Mypage() {
  const dispatch = useDispatch();

  const myInfoList = useSelector((state) => state.mypage.myInfo);

  // 유저의 챌린지들 가져오기
  React.useEffect(() => {
    dispatch(myInfo.getMyInfoDB());
  }, []);

  // 수정 완료 버튼
  const editProfile = () => {
    dispatch(myInfo.editMyProfileDB());
  };

  const [inProgress, setInprogress] = useState(true);
  const [upComing, setUpComing] = useState(false);
  const [completed, setCompleted] = useState(false);

  const changeInProgress = () => {
    setInprogress(true);
    setUpComing(false);
    setCompleted(false);
  };

  const changeUpComing = () => {
    setUpComing(true);
    setInprogress(false);
    setCompleted(false);
  };

  const changeCompleted = () => {
    setInprogress(false);
    setUpComing(false);
    setCompleted(true);
  };

  return (
    <>
      <UserInfoContainer>
        <UserInfoBox>
          <UserImg>
            <img src={myInfoList.profileImg} alt="" />
          </UserImg>

          <UserInfo>
            <span>{myInfoList.nickname}</span>
            <span>챌린지를 열심히 참여하고 계시군요!</span>
          </UserInfo>
        </UserInfoBox>

        <EditBox>
          <button>수정</button>
        </EditBox>
      </UserInfoContainer>

      <ChallengeCategory>
        <button onClick={changeInProgress}>진행중인 챌린지</button>
        <button onClick={changeUpComing}>진행 예정 챌린지</button>
        <button onClick={changeCompleted}>완료한 챌린지</button>
        <button>FAQ</button>
      </ChallengeCategory>
      <Section>
        <div>
          {inProgress === true && <ChallengesInProgress />}
          {inProgress === false && null}
          {upComing === true && <UpcomingChallenge />}
          {upComing === false && null}
          {completed === true && <CompletedChallenge />}
          {completed === false && null}
        </div>
      </Section>
    </>
  );
}

const UserInfoContainer = styled.div`
  width: 100%;
  height: 150px;
  background-color: firebrick;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const UserInfoBox = styled.div`
  display: flex;
  justify-content: space-around;
`;

const UserImg = styled.div`
  width: 50px;
  height: 50px;
  img {
    background-color: blue;
    width: 50px;
    height: 50px;
  }
`;

const UserInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const EditBox = styled.div``;

const ChallengeCategory = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: blanchedalmond;
`;

const Section = styled.div`
  width: 100%;
  height: 100vh;
  background-color: chartreuse;
  padding: 20px;
`;

export default Mypage;
