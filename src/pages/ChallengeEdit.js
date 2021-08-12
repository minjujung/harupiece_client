import React, { useEffect, useState } from "react";
import styled from "styled-components";

import Down from "../assets/images/icons/arrow/down.svg";
import greenclose from "../assets/images/icons/greenclose.svg";
import CreateImgSelect from "../components/challenge/CreateImgSelect";
import CreateCertification from "../components/challenge/CreateCertification";
import CreateCalendar from "../components/challenge/CreateCalendar";

import { history } from "../redux/configureStore";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as createActions } from "../redux/modules/challengeCreate";
import { actionCreator as challengeDetailActions } from "../redux/modules/challengeDetail";
import { Button, Image } from "../elements";
import PwdModal from "../components/challenge/PwdModal";

function ChallengeCreate(props) {
  const dispatch = useDispatch();
  const challenge_info = useSelector((state) => state.challengeDetail.detail);

  const challenge_id = props.match.params.id;

  useEffect(() => {
    dispatch(challengeDetailActions.getChallengeDetailDB(challenge_id));
  }, []);

  const [challengeInfo, setChallengeInfo] = useState({
    ...challenge_info,
    challengeHoliday: "",
    challengeBad: "",
    challengeGood: "",
  });

  // 챌린지 이름
  const saveTitle = (e) => {
    setChallengeInfo({ ...challengeInfo, challengeTitle: e.target.value });
  };

  // 모집 형식
  const [pwdCheck, setPwdCheck] = useState(false);
  const [pwd, setPwd] = useState("");
  const [open, setOpen] = useState(false);

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

  // 하단 이미지 안내 뱃지
  const [badge, setBadge] = useState(true);

  const hideBadge = () => {
    setBadge(false);
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

  // 챌린지  수정 전 날짜
  const oldDate = `${challenge_info.challengeStartDate.split("T")[0]} ~ 
  ${challenge_info.challengeEndDate.split("T")[0]}`;

  // 챌린지 수정
  const editChallenge = () => {
    if (challengeInfo.challengeStartDate === "") {
      window.alert("챌린지 시작날짜를 선택해주세요.");
      return;
    }
    if (challengeInfo.challengeEndDate === undefined) {
      window.alert("챌린지 종료날짜를 선택해주세요.");
      return;
    }
    if (challengeInfo.challengeGood === "") {
      window.alert("챌린지 인증 예시를 재등록해주세요.");
      return;
    }
    if (challengeInfo.challengeBad === "") {
      window.alert("챌린지 인증 예시를 재등록해주세요.");
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
    dispatch(
      challengeDetailActions.editChallengeDB(challenge_id, challengeInfo)
    );
    dispatch(createActions.setGoodPreview(""));
    dispatch(createActions.setBadPreview(""));
  };

  return (
    <>
      <Container>
        <LeftContainer isBadge={badge}>
          <Title>
            <h2>챌린지 수정</h2>
          </Title>
          <GuideLine />
        </LeftContainer>
        <RightContainer>
          <AllInputContainer isBadge={badge}>
            <InputLeftContainer>
              <div>
                <Label>제목</Label>
                <br />
                <Input
                  onChange={saveTitle}
                  placeholder={challenge_info.challengeTitle}
                />
              </div>
              {/* 카테고리 */}
              <CategoryInfo>
                <h4>{challenge_info.categoryName}</h4>
                <p>
                  카테고리는 수정이 불가해요! 다른 카테고리의 챌린지를 원하시면
                  삭제하고 다시 만들어주세요!
                </p>
              </CategoryInfo>
              {/* 대표 이미지 */}
              <CreateImgSelect
                challengeInfo={challengeInfo}
                setChallengeInfo={setChallengeInfo}
                id={challenge_id}
              />
              {/* 인증샷 예시 */}
              <CreateCertification
                challengeInfo={challengeInfo}
                setChallengeInfo={setChallengeInfo}
              />
            </InputLeftContainer>
            <InputRightContainer>
              {/* date picker */}
              <div>
                <CreateCalendar
                  challengeInfo={challengeInfo}
                  setChallengeInfo={setChallengeInfo}
                  id={challenge_id}
                  oldDate={oldDate}
                />
              </div>
              {/* 모집형식 */}
              <div>
                <Label htmlFor="isPwd">모집 방식</Label>
                <br />
                <SelectContainer>
                  <img src={Down} alt="down" />
                  <SelectBox id="isPwd" onChange={choosePublic}>
                    <option value="CATEGORY">비밀번호 설정</option>
                    <option value="PUBLIC">공개</option>
                    <option value="PRIVATE">비공개</option>
                  </SelectBox>
                  <PwdModal
                    pwd={pwd}
                    setPwd={setPwd}
                    savePwd={savePwd}
                    open={open}
                    setOpen={setOpen}
                  />
                </SelectContainer>
              </div>
              {/* 챌린지 설명 */}
              <div>
                <Label>챌린지 설명</Label>
                <br />
                <Textarea
                  onChange={saveDesc}
                  placeholder={challenge_info.challengeContent}
                />
              </div>
              <Button
                width="15.00vw"
                height="5.92vh"
                margin="7.03vh 0 0 0"
                _onClick={editChallenge}
              >
                챌린지 수정하기
              </Button>
            </InputRightContainer>
          </AllInputContainer>
          {badge ? (
            <Button
              width="100%"
              height="64px"
              margin="7.4vh 0 0 0"
              bg="white"
              color="mainGreen"
              border="mainGreen"
              shadow
            >
              <BadgeText>
                이미지를 변경하려면 다시 선택해 주세요.
                <Image
                  width="20px"
                  height="20px"
                  src={greenclose}
                  alt="closeBtn"
                  borderRadius="0"
                  onClick={hideBadge}
                />
              </BadgeText>
            </Button>
          ) : null}
        </RightContainer>
      </Container>
    </>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100vh;
  justify-content: center;
  /* padding: 0 16.66vw 23.24vh 16.66vw; */
`;

const LeftContainer = styled.div`
  flex-direction: column;
  ${(props) =>
    !props.isBadge ? "margin-bottom: 7.4vh;" : "margin-bottom: 11.1vh;"}
`;

const Title = styled.div`
  & > h2 {
    font-size: 36px;
    font-weight: 700;
    width: 10.04vw;
    height: 4.81vh;
  }
`;

const GuideLine = styled.div`
  background-color: ${({ theme }) => theme.colors.lightGray};
  border-radius: 8px;
  width: 32.81vw;
  height: 53.79vh;
  margin-right: 2.92vh;
`;

const InputLeftContainer = styled.div`
  flex-direction: column;
  margin-right: 0.94vw;
`;

const InputRightContainer = styled.div`
  flex-direction: column;
`;

const BadgeText = styled.div`
  display: flex;
  width: 27.66vw;
  height: 100%;
  justify-content: space-between;
  align-items: center;
  margin-left: 29px;
`;

const RightContainer = styled.div``;

const AllInputContainer = styled.div`
  display: flex;
  width: 30.93vw;
  height: 53.79vh;
  margin-top: 5vh;
  ${(props) => (!props.isBadge ? "margin-bottom: 7.4vh;" : null)}
`;

const Input = styled.input`
  width: 15vw;
  height: 3.7vh;
  margin-top: 0.74vh;
  margin-bottom: 2.96vh;
  background-color: ${({ theme }) => theme.colors.lightGray};
  font-size: ${({ theme }) => theme.fontSizes.ms};
  padding-left: 0.83vw;
  padding-top: 1.01vh;
  padding-bottom: 1.01vh;
  border-radius: 8px;
`;

const Textarea = styled.textarea`
  width: 15vw;
  height: 12.59vh;
  resize: none;
  margin-top: 0.74vh;
  padding-left: 0.83vw;
  padding-right: 0.83vw;
  padding-top: 1.01vh;
  background-color: ${({ theme }) => theme.colors.lightGray};
  border-radius: 8px;
  font-size: ${({ theme }) => theme.fontSizes.ms};
  color: ${({ theme }) => theme.colors.darkGray};
  font-weight: 400;
  ::placeholder {
    font-size: ${({ theme }) => theme.fontSizes.ms};
    color: ${({ theme }) => theme.colors.darkGray};
    font-weight: 400;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
      "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
      "Helvetica Neue", sans-serif;
  }
`;

const Label = styled.label`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: 400;
  color: ${({ theme }) => theme.colors.darkGray};
`;

const SelectBox = styled.select`
  width: 100%; /* 원하는 너비설정 */
  padding: 0.75vh 0.83vw; /* 여백으로 높이 설정 */
  margin: 0.74vh 0 2.96vh 0;
  font-family: inherit; /* 폰트 상속 */
  font-size: ${({ theme }) => theme.fontSizes.ms};
  color: ${({ theme }) => theme.colors.darkGray};
  background-color: ${({ theme }) => theme.colors.lightGray};
  border: none;
  border-radius: 8px; /* iOS 둥근모서리 제거 */
  -webkit-appearance: none; /* 네이티브 외형 감추기 */
  -moz-appearance: none;
  appearance: none;
`;

const SelectContainer = styled.div`
  width: 15vw;
  position: relative;
  & > img {
    width: 15px;
    height: 15px;
    position: absolute;
    right: 16px;
    top: 16px;
  }
`;

const CategoryInfo = styled.div`
  height: 10vh;
  h4 {
    font-weight: bold;
    line-height: normal;
  }
  p {
    color: ${({ theme }) => theme.colors.mainGreen};
  }
`;
export default ChallengeCreate;
