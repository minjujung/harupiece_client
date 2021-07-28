import React, { useState } from "react";
import styled from "styled-components";
import CreateImgSelect from "../components/CreateImgSelect";
import CreateCertification from "../components/CreateCertification";
import CreateCalendar from "../components/CreateCalendar";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as createActions } from "../redux/modules/challengeCreate";
import { useForm } from "react-hook-form";

// consolelog logger
import { consoleLogger } from "../redux/configureStore";

function ChallengeCreate(props) {
  const dispatch = useDispatch();

  const [challengeInfo, setChallengeInfo] = useState({
    categoryName: "",
    challengeContent: "",
    challengeTitle: "",
    challengeStartDate: "",
    challengeEndDate: "",
    challengeImgUrl: "",
    challengePassword: "",
    challengeGood: "",
    challengeBad: "",
    challengeHoliday: "",
  });

  // title
  const saveTitle = (e) => {
    setChallengeInfo({ ...challengeInfo, challengeTitle: e.target.value });
  };

  // 카테고리 설정

  const chooseCategory = (e) => {
    setChallengeInfo({ ...challengeInfo, categoryName: e.target.value });
  };

  // 대표이미지 설정

  // 모집 형식 state
  // 비밀번호 형식..
  const [pwd, setPwd] = useState(false);

  const choosePublic = (e) => {
    if (e.target.value === "PRIVATE") {
      setPwd(true);
    }
  };

  const savePwd = (e) => {
    setChallengeInfo({ ...challengeInfo, challengePassword: e.target.value });
  };

  // challenge description
  const saveDesc = (e) => {
    setChallengeInfo({ ...challengeInfo, challengeContent: e.target.value });
  };

  // create challenge
  const createChallenge = () => {
    dispatch(createActions.createChDB(setChallengeInfo));
  };

  return (
    <>
      <h2>챌린지 개설</h2>

      <CreateContainer>
        <GuideLine>개설 가이드라인</GuideLine>

        <CreateContents>
          <Contents>
            <label style={{ width: "100%" }}>
              제목
              <input onChange={saveTitle} placeholder="제목을 입력해주세요" />
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
              <CreateCertification />
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
                    placeholder="챌린지를 설명해주세요."
                  />
                </div>
              </label>
            </Contents>
          </ContentsContainer>

          {/* 챌린지 개설 */}
          <button onClick={createChallenge}>챌린지 개설하기</button>
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
