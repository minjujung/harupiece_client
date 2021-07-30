import React, { useEffect, useState } from "react";
import styled from "styled-components";
import CreateImgSelect from "../components/CreateImgSelect";
import CreateCertification from "../components/CreateCertification";
import CreateCalendar from "../components/CreateCalendar";

import { history } from "../redux/configureStore";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as createActions } from "../redux/modules/challengeCreate";
import { actionCreator as challengeDetailActions } from "../redux/modules/challengeDetail";

function ChallengeCreate(props) {
  const dispatch = useDispatch();
  const challenge_info = useSelector((state) => state.challengeDetail.detail);

  const challengeId = props.match.params.id;
  const edit_mode = challengeId ? true : false;

  useEffect(() => {
    if (edit_mode && !challenge_info) {
      window.alert("챌린지 정보가 없어요!");
      history.goBack();
    }
    dispatch(challengeDetailActions.getChallengeDetailDB(challengeId));
  }, []);

  const [challengeInfo, setChallengeInfo] = useState({
    categoryName: "",
    challengeBad: "",
    challengeContent: "",
    challengeEndDate: "",
    challengeGood: "",
    challengeTitle: "",
    challengeHoliday: "",
    challengeStartDate: "",
    challengeImgUrl: "",
    challengePassword: "",
  });

  // 챌린지 이름
  const saveTitle = (e) => {
    setChallengeInfo({ ...challengeInfo, challengeTitle: e.target.value });
  };

  // 챌린지 카테고리 설정
  const chooseCategory = (e) => {
    setChallengeInfo({ ...challengeInfo, categoryName: e.target.value });
  };

  // 모집 형식
  const [pwd, setPwd] = useState(false);

  const choosePublic = (e) => {
    if (e.target.value === "PRIVATE") {
      setPwd(true);
    }
  };

  //모집형식이 비공개일때 비밀번호 설정
  const savePwd = (e) => {
    setChallengeInfo({ ...challengeInfo, challengePassword: e.target.value });
  };

  // 챌린지 설명
  const saveDesc = (e) => {
    setChallengeInfo({ ...challengeInfo, challengeContent: e.target.value });
  };

  // 챌린지 개설
  const createChallenge = () => {
    dispatch(createActions.createChDB(challengeInfo));
    history.push("/");
  };

  // 챌린지 수정
  const editChallenge = () => {
    dispatch(
      challengeDetailActions.editChallengeDB(challengeId, challengeInfo)
    );
    history.push(`/challenge/${challenge_info.challengeId}`);
  };

  return (
    <>
      {edit_mode ? <h2>챌린지 수정</h2> : <h2>챌린지 개설</h2>}

      <CreateContainer>
        <GuideLine>개설 가이드라인</GuideLine>

        <CreateContents>
          <Contents>
            <label style={{ width: "100%" }}>
              제목
              <input
                onChange={saveTitle}
                placeholder={
                  edit_mode
                    ? challenge_info.challengeTitle
                    : "제목을 입력해주세요"
                }
              />
            </label>
          </Contents>

          <ContentsContainer>
            <Contents>
              {/* 카테고리 */}
              <label htmlFor="category">카테고리</label>
              <select id="category" onChange={chooseCategory}>
                <option value="CATEGORY">카테고리</option>
                <option value="MONEY">돈 관리</option>
                <option value="STUDY">공부</option>
                <option value="EXERCISE">운동</option>
                <option value="LIVINGHABITS">생활습관</option>
              </select>

              {/* 대표 이미지 */}
              <CreateImgSelect
                challengeInfo={challengeInfo}
                setChallengeInfo={setChallengeInfo}
              />
              {/* 인증샷 예시 */}
              <CreateCertification
                challengeInfo={challengeInfo}
                setChallengeInfo={setChallengeInfo}
              />
            </Contents>

            <Contents>
              {/* date picker */}
              <CreateCalendar
                challengeInfo={challengeInfo}
                setChallengeInfo={setChallengeInfo}
              />

              {/* 모집형식 */}
              <label htmlFor="category">카테고리</label>
              <select id="category" onChange={choosePublic}>
                <option value="CATEGORY">카테고리</option>
                <option value="PUBLICK">공개</option>
                <option value="PRIVATE">비공개</option>
              </select>
              {pwd ? (
                <input
                  type="password"
                  placeholder="비밀번호를 입력해주세요."
                  onChange={savePwd}
                />
              ) : null}

              {/* 챌린지 설명 */}
              <label>
                챌린지 설명
                <div>
                  <input
                    onChange={saveDesc}
                    placeholder={
                      edit_mode
                        ? challenge_info.challengeContent
                        : "챌린지를 설명해주세요."
                    }
                  />
                </div>
              </label>
            </Contents>
          </ContentsContainer>

          {edit_mode ? (
            <>
              <button onClick={editChallenge}>챌린지 수정하기</button>
              <button onClick={() => history.goBack()}>챌린지 수정취소</button>
            </>
          ) : (
            <button onClick={createChallenge}>챌린지 개설하기</button>
          )}
        </CreateContents>
      </CreateContainer>
    </>
  );
}

const CreateContainer = styled.div`
  background-color: orange;
  display: flex;
  width: 100%;
  height: 100vh;
`;

const GuideLine = styled.div`
  background-color: coral;
  width: 50%;
  height: 100%;
  padding: 20px;
`;

const CreateContents = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  height: 100%;
  background-color: palegreen;
  padding: 20px;
`;

const ContentsContainer = styled.div`
  display: flex;
  width: 100%;
  padding-top: 50px;
  padding-bottom: 50px;
`;

const Contents = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

export default ChallengeCreate;
