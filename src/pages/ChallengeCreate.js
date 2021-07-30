import React, { useEffect, useRef, useState } from "react";
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

    if (!edit_mode) {
      return;
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
  const [pwdCheck, setPwdCheck] = useState(false);
  const [pwd, setPwd] = useState("");
  const publicInput = useRef();

  const choosePublic = (e) => {
    console.log(e.target.value);
    if (e.target.value === "PRIVATE") {
      setPwdCheck(true);
    } else if (e.target.value === "PUBLIC") {
      setPwdCheck(false);
      setPwd("PUBLIC");
    } else {
      setPwdCheck(false);
    }
  };

  //모집형식이 비공개일때 비밀번호 설정
  const savePwd = (e) => {
    setPwd(e.target.value);
    setChallengeInfo({ ...challengeInfo, challengePassword: e.target.value });
  };

  // 챌린지 설명
  const saveDesc = (e) => {
    setChallengeInfo({ ...challengeInfo, challengeContent: e.target.value });
  };

  // 챌린지 개설
  const createChallenge = () => {
    if (challengeInfo.challengeTitle === "") {
      window.alert("챌린지 이름을 입력해주세요.");
      return;
    }
    if (challengeInfo.challengeContent === "") {
      window.alert("챌린지 설명을 입력해주세요.");
      return;
    }
    if (challengeInfo.categoryName === "") {
      window.alert("챌린지 카테고리를 선택해주세요.");
      return;
    }
    if (challengeInfo.challengeImgUrl === "") {
      window.alert("챌린지 대표이미지를 선택해주세요.");
      return;
    }
    if (challengeInfo.challengeStartDate === "") {
      window.alert("챌린지 시작날짜를 선택해주세요.");
      return;
    }
    if (challengeInfo.challengeEndDate === undefined) {
      window.alert("챌린지 종료날짜를 선택해주세요.");
      return;
    }
    if (challengeInfo.challengeGood === "") {
      window.alert("챌린지 인증 예시를 등록해주세요.");
      return;
    }
    if (challengeInfo.challengeBad === "") {
      window.alert("챌린지 인증 예시를 등록해주세요.");
      return;
    }

    if (!pwdCheck && pwd !== "PUBLIC") {
      window.alert("공개 / 비공개 설정을 등록해주세요.");
      return;
    }

    if (pwdCheck && pwd === "") {
      window.alert("비공개 챌린지는 비밀번호가 반드시 필요합니다!");
      return;
    }
    dispatch(createActions.createChDB(challengeInfo));
    window.alert("챌린지 개설 완료!");
    dispatch(createActions.setGoodPreview(""));
    dispatch(createActions.setBadPreview(""));
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
              <select id="category" ref={publicInput} onChange={choosePublic}>
                <option value="CATEGORY">카테고리</option>
                <option value="PUBLIC">공개</option>
                <option value="PRIVATE">비공개</option>
              </select>
              {pwdCheck ? (
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
