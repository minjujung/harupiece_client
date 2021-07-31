import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as myInfo } from "../redux/modules/mypage";
import ChallengesInProgress from "../components/ChallengesInProgress";
import UpcomingChallenge from "../components/UpcomingChallenge";
import CompletedChallenge from "../components/CompletedChallenge";
import MyPassword from "../components/MyPassword";
import MyPieces from "../components/MyPieces";

function Mypage() {
  const dispatch = useDispatch();

  const [editMode, setEditMode] = useState(false);

  const myInfoList = useSelector((state) => state.mypage.myInfo);
  const nickName = myInfoList.nickname;

  const [newNickName, setNewNickName] = useState(nickName);

  // 유저의 챌린지들 가져오기
  React.useEffect(() => {
    dispatch(myInfo.getMyInfoDB());
  }, []);

  const convertEditMode = () => {
    setNewNickName(nickName);
    setEditMode(!editMode);
  };

  // 프로필 수정 모드
  const editComment = (e) => {
    e.preventDefault();
    // dispatch();
    convertEditMode();
  };

  const fileInput = React.useRef();

  const selectFile = () => {
    const reader = new FileReader();
    const file = fileInput.current.files[0];

    if (!file) {
      return;
    }

    reader.readAsDataURL(file);
    reader.onloadend = () => {
      dispatch(myInfo.setPreview(reader.result));
    };
  };

  // 프로필 preview 상태 값
  const preview = useSelector((state) => state.mypage.preview);

  // 카테고리 상태 값
  const [inProgress, setInprogress] = useState(true);
  const [upComing, setUpComing] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [piece, setPiece] = useState(false);
  const [password, setPassword] = useState(false);

  const changeInProgress = () => {
    setInprogress(true);
    setUpComing(false);
    setCompleted(false);
    setPiece(false);
    setPassword(false);
  };

  const changeUpComing = () => {
    setInprogress(false);
    setUpComing(true);
    setCompleted(false);
    setPiece(false);
    setPassword(false);
  };

  const changeCompleted = () => {
    setInprogress(false);
    setUpComing(false);
    setCompleted(true);
    setPiece(false);
    setPassword(false);
  };

  const changePiece = () => {
    setInprogress(false);
    setUpComing(false);
    setCompleted(false);
    setPiece(true);
    setPassword(false);
  };

  const changePassword = () => {
    setInprogress(false);
    setUpComing(false);
    setCompleted(false);
    setPiece(false);
    setPassword(true);
  };

  // 수정 완료 버튼
  const editProfile = () => {
    const file = fileInput.current.files[0];
    if (newNickName === nickName) {
      setNewNickName(nickName);
    }
    if (!file) {
      dispatch(
        myInfo.editMyProfileDB({ newNickName, file: myInfoList.profileImage })
      );
    } else {
      dispatch(myInfo.editMyProfileDB({ newNickName, file }));
      dispatch(myInfo.setPreview(""));
    }
    convertEditMode();
  };

  if (editMode) {
    return (
      <>
        <UserInfoContainer>
          <UserInfoBox>
            <UserImg>
              <label htmlFor="ex_file">
                {
                  <img
                    src={preview ? preview : myInfoList.profileImage}
                    alt=""
                  />
                }
              </label>
              <input
                ref={fileInput}
                onChange={selectFile}
                type="file"
                id="ex_file"
              ></input>
            </UserImg>

            <UserInfo>
              <input
                type="text"
                value={newNickName}
                onChange={(e) => setNewNickName(e.target.value)}
                onSubmit={editComment}
              />
              <span>챌린지를 열심히 참여하고 계시군요!</span>
            </UserInfo>
          </UserInfoBox>

          <EditBox>
            <button onClick={editProfile}>완료</button>
          </EditBox>
        </UserInfoContainer>

        <ChallengeCategory>
          <button onClick={changeInProgress}>진행중인 챌린지</button>
          <button onClick={changeUpComing}>진행 예정 챌린지</button>
          <button onClick={changeCompleted}>완료한 챌린지</button>
          <button onClick={changePiece}>조각 모음</button>
          <button onClick={changePassword}>비밀번호 변경</button>
        </ChallengeCategory>

        <Section>
          <div>
            {inProgress === true && <ChallengesInProgress />}
            {inProgress === false && null}
            {upComing === true && <UpcomingChallenge />}
            {upComing === false && null}
            {completed === true && <CompletedChallenge />}
            {completed === false && null}
            {piece === true && <MyPieces />}
            {piece === false && null}
            {password === true && <MyPassword />}
            {password === false && null}
          </div>
        </Section>
      </>
    );
  }

  return (
    <>
      <UserInfoContainer>
        <UserInfoBox>
          <UserImg>
            <img src={myInfoList.profileImage} alt="" />
          </UserImg>

          <UserInfo>
            <span>{myInfoList.nickname}</span>
            <span>챌린지를 열심히 참여하고 계시군요!</span>
          </UserInfo>
        </UserInfoBox>

        <EditBox>
          <button onClick={convertEditMode}>수정</button>
        </EditBox>
      </UserInfoContainer>

      <ChallengeCategory>
        <button onClick={changeInProgress}>진행중인 챌린지</button>
        <button onClick={changeUpComing}>진행 예정 챌린지</button>
        <button onClick={changeCompleted}>완료한 챌린지</button>
        <button onClick={changePiece}>조각 모음</button>
        <button onClick={changePassword}>비밀번호 변경</button>
      </ChallengeCategory>
      <Section>
        <div>
          {inProgress === true && <ChallengesInProgress />}
          {inProgress === false && null}
          {upComing === true && <UpcomingChallenge />}
          {upComing === false && null}
          {completed === true && <CompletedChallenge />}
          {completed === false && null}
          {piece === true && <MyPieces />}
          {piece === false && null}
          {password === true && <MyPassword />}
          {password === false && null}
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
  label {
    border: none;
    color: #0095f6;
    cursor: pointer;
  }
  input[type="file"] {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
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

const Form = styled.form`
  width: 100%;
  height: 100%;
`;

export default Mypage;
