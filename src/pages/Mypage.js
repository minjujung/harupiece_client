import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as myInfo } from "../redux/modules/mypage";
import ChallengesInProgress from "../components/ChallengesInProgress";
import UpcomingChallenge from "../components/UpcomingChallenge";
import CompletedChallenge from "../components/CompletedChallenge";
import MyPassword from "../components/MyPassword";
import MyPieces from "../components/MyPieces";
import { Link, Route, Switch } from "react-router-dom";
import { ChallengeDetailApis } from "../shared/api";

function Mypage(props) {
  const dispatch = useDispatch();
  const {
    match: { path },
  } = props;

  // 유저의 챌린지들 가져오기
  useEffect(() => {
    dispatch(myInfo.getMyInfoDB());
  }, []);

  //   1. 완료한 챌린지 시작날짜 끝날짜

  // 2. 참여중인 인원수 보여주기(participateSize)

  // 3. 참여중인 유저 이미지 들어갈 4개 원 만들기

  const [editMode, setEditMode] = useState(false);

  const myInfoList = useSelector((state) => state.mypage.myInfo);
  const nickName = myInfoList.nickname;

  const [newNickName, setNewNickName] = useState(nickName);

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

  return (
    <div style={{ paddingTop: "4em" }}>
      <UserInfoContainer>
        <UserInfoBox>
          <UserImg>
            {editMode ? (
              <>
                <label htmlFor="ex_file">
                  <img
                    src={preview ? preview : myInfoList.profileImage}
                    alt=""
                  />
                </label>
                <input
                  ref={fileInput}
                  onChange={selectFile}
                  type="file"
                  id="ex_file"
                ></input>
              </>
            ) : (
              <img src={myInfoList.profileImage} alt="" />
            )}
          </UserImg>

          <UserInfo>
            {editMode ? (
              <input
                type="text"
                value={newNickName}
                onChange={(e) => setNewNickName(e.target.value)}
                onSubmit={editComment}
              />
            ) : (
              <span>{myInfoList.nickname}</span>
            )}

            <span>챌린지를 열심히 참여하고 계시군요!</span>
          </UserInfo>
        </UserInfoBox>

        <EditBox>
          {editMode ? (
            <button onClick={editProfile}>완료</button>
          ) : (
            <button onClick={convertEditMode}>수정</button>
          )}
        </EditBox>
      </UserInfoContainer>
      <ChallengeCategory>
        <li>
          <Link to={`${path}/now`}>진행중인 챌린지</Link>
        </li>
        <li>
          <Link to={`${path}/upcoming`}>진행 예정 챌린지</Link>
        </li>
        <li>
          <Link to={`${path}/completed`}>완료한 챌린지</Link>
        </li>
        <li>
          <Link to={`${path}/pieces`}>조각 모음</Link>
        </li>
        <li>
          <Link to={`${path}/password`}>비밀번호 변경</Link>
        </li>
      </ChallengeCategory>
      <Section>
        <Switch>
          <Route path={`${path}/now`} component={ChallengesInProgress} />
          <Route path={`${path}/upcoming`} component={UpcomingChallenge} />
          <Route path={`${path}/completed`} component={CompletedChallenge} />
          <Route path={`${path}/pieces`} component={MyPieces} />
          <Route path={`${path}/password`} component={MyPassword} />
        </Switch>
      </Section>
    </div>
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

const ChallengeCategory = styled.ul`
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: blanchedalmond;
  margin: 0;
  list-style: none;
`;

const Section = styled.div`
  width: 100%;
  height: 100vh;
  background-color: chartreuse;
  padding: 20px;
`;

export default Mypage;
