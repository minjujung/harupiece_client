import React, { useState } from "react";
import styled from "styled-components";
import CreateImgSelect from "../components/CreateImgSelect";
import CreateCertification from "../components/CreateCertification";
import CreateCalendar from "../components/CreateCalendar";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as createActions } from "../redux/modules/challengeCreate";

// consolelog logger
import { consoleLogger } from "../redux/configureStore";

// date range picker
import { enGB } from "date-fns/locale";
import { DateRangePicker, START_DATE, END_DATE } from "react-nice-dates";
import "react-nice-dates/build/style.css";

function ChallengeCreate(props) {
  const dispatch = useDispatch();

  // title
  const [title, setTitle] = useState("");

  const changeTitle = (e) => {
    setTitle(e.target.value);
    console.log(setTitle());
    console.log(e.target.value);
  };

  // 모집 형식 state
  const [privates, setPrivates] = useState(false);

  // challenge description
  const [desc, setDesc] = useState("");

  // create challenge
  const createChallenge = () => {
    // memberName: " ",
    // challengeTitle: " ",
    // challengeContent: " ",
    // categoryName: " ",
    // challengePassword: " ",
    // challengeStartDate: " ",
    // challengeEndDate: " ",
    // challengeProgress: " ",
    // challengeImgUrl: " ",
    // challengeGood: " ",
    // challengeBad: " ",
    // challengeHoliday: " ",
    dispatch(createActions.createChDB(title, desc));
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
              <input onChange={changeTitle} placeholder="제목을 입력해주세요" />
            </label>
          </Contents>

          <ContentsContainer>
            <Contents>
              {/* 카테고리 */}
              <label>카테고리</label>
              <select>
                <option value="">카테고리</option>
                <option value="">돈 관리</option>
                <option value="">공부</option>
                <option value="">다이어트</option>
                <option value="">생활습관</option>
              </select>

              {/* 대표 이미지 */}
              <CreateImgSelect />
              {/* 인증샷 예시 */}
              <CreateCertification />
            </Contents>

            <Contents>
              {/* date picker */}
              <CreateCalendar />

              {/* 모집형식 */}
              <label>모집형식</label>
              <select>
                <option value="">카테고리</option>
                <option value="">공개</option>
                <option value="">비공개</option>
              </select>

              {/* 챌린지 설명 */}
              <label>
                챌린지 설명
                <div>
                  <input
                    onChange={(e) => {
                      setDesc(e.target.value);
                      console.log(setDesc(e.target.value));
                    }}
                    placeholder="챌린지를 설명해주세요."
                  />
                </div>
              </label>
            </Contents>
          </ContentsContainer>

          {/* 챌린지 개설 */}
          <button>챌린지 개설하기</button>
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
